import { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import { Button } from "react-bootstrap";
import { PosesDropDown } from "../components/PosesDropDown";
import AI_gameStyles from "../css/AI_game.module.css";
import {
  deletePoseRecordApi,
  fetchAllPoses,
  fetchPoseRecord,
  insertPoseRecord,
} from "../api/poses";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { showMsgAlert } from "../utils/alert";
import { PoseRecord } from "../components/PoseRecord";
import { convertToTitleCase } from "../utils/convertTitle";
import { Dialog } from "primereact/dialog";

const defaultColor = "rgb(255,255,255)";
const rightPoseColor = "#FB6855";

let skeletonColor = defaultColor;

let interval: NodeJS.Timer;

// flag variable is used to help capture the time when AI just detect
// the pose as correct(probability more than threshold)
let flag = false;

export default function AIGamePage() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [startingTime, setStartingTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [poseTime, setPoseTime] = useState(0);
  const [currentPose, setCurrentPose] = useState({ id: 1, name: "boat_pose" });
  const [isStartPose, setIsStartPose] = useState(false);
  const [poses, setPoses] = useState<any[]>([]);
  const [postRecord, setPoseRecord] = useState<any>([]);
  const [isOpenDeleteRecordDialog, setIsOpenDeleteRecordDialog] =
    useState<boolean>(false);
  const [targetDeleteRecordId, setTargetDeleteRecordId] = useState(0);
  const isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticate
  );
  const { REACT_APP_API_SERVER } = process.env;

  async function getPoses() {
    let res = await fetchAllPoses();
    let posesResult = await res.json();
    if (posesResult.success) {
      setPoses(posesResult.data);
    }
  }

  async function getPoseRecord() {
    let res = await fetchPoseRecord();
    let poseRecordResult = await res.json();
    if (poseRecordResult.success) {
      setPoseRecord(poseRecordResult);
    }
  }

  async function getDeletePoseRecordInfo(id: any) {
    setTargetDeleteRecordId(id);
    setIsOpenDeleteRecordDialog(true);
  }

  async function deletePoseRecord() {
    // console.log("delete:", targetDeleteRecordId);
    let res = await deletePoseRecordApi(targetDeleteRecordId);
    let result = await res.json();
    if (result.success) {
      setIsOpenDeleteRecordDialog(false);
      setTargetDeleteRecordId(0);
      getPoseRecord();
    }
  }

  useEffect(() => {
    getPoses();
    getPoseRecord();
  }, []);

  const POINTS = {
    NOSE: 0,
    LEFT_EYE: 1,
    RIGHT_EYE: 2,
    LEFT_EAR: 3,
    RIGHT_EAR: 4,
    LEFT_SHOULDER: 5,
    RIGHT_SHOULDER: 6,
    LEFT_ELBOW: 7,
    RIGHT_ELBOW: 8,
    LEFT_WRIST: 9,
    RIGHT_WRIST: 10,
    LEFT_HIP: 11,
    RIGHT_HIP: 12,
    LEFT_KNEE: 13,
    RIGHT_KNEE: 14,
    LEFT_ANKLE: 15,
    RIGHT_ANKLE: 16,
  };

  const keyPointConnections = {
    nose: ["left_ear", "right_ear"],
    left_ear: ["left_shoulder"],
    right_ear: ["right_shoulder"],
    left_shoulder: ["right_shoulder", "left_elbow", "left_hip"],
    right_shoulder: ["right_elbow", "right_hip"],
    left_elbow: ["left_wrist"],
    right_elbow: ["right_wrist"],
    left_hip: ["left_knee", "right_hip"],
    right_hip: ["right_knee"],
    left_knee: ["left_ankle"],
    right_knee: ["right_ankle"],
  };

  useEffect(() => {
    const timeDiff = (currentTime - startingTime) / 1000;
    if (flag) {
      setPoseTime(timeDiff);
    }
  }, [currentTime, startingTime]);

  useEffect(() => {
    setCurrentTime(0);
    setPoseTime(0);
  }, [currentPose]);

  // Draw between the detected 17 key-points
  function drawSegment(
    ctx: any,
    [mx, my]: number[],
    [tx, ty]: number[],
    color: string
  ) {
    ctx.beginPath();
    ctx.moveTo(mx, my);
    ctx.lineTo(tx, ty);
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.stroke();
  }
  // Display 17 key-points on detected human body
  function drawPoint(ctx: any, x: number, y: number, r: number, color: string) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }

  // Pro-Processing arrays of images  function start
  function get_center_point(
    landmarks: string,
    left_bodyPart: number,
    right_bodyPart: number
  ) {
    let left = tf.gather(landmarks, left_bodyPart, 1);
    let right = tf.gather(landmarks, right_bodyPart, 1);
    const center = tf.add(tf.mul(left, 0.5), tf.mul(right, 0.5));
    return center;
  }

  function get_pose_size(landmarks: string, torso_size_multiplier = 2.5) {
    let hips_center = get_center_point(
      landmarks,
      POINTS.LEFT_HIP,
      POINTS.RIGHT_HIP
    );
    let shoulders_center = get_center_point(
      landmarks,
      POINTS.LEFT_SHOULDER,
      POINTS.RIGHT_SHOULDER
    );
    let torso_size = tf.norm(tf.sub(shoulders_center, hips_center));
    let pose_center_new = get_center_point(
      landmarks,
      POINTS.LEFT_HIP,
      POINTS.RIGHT_HIP
    );
    pose_center_new = tf.expandDims(pose_center_new, 1);

    pose_center_new = tf.broadcastTo(pose_center_new, [1, 17, 2]);
    // return: shape(17,2)
    let d = tf.gather(tf.sub(landmarks, pose_center_new), 0, 0);
    let max_dist = tf.max(tf.norm(d, "euclidean", 0));

    // normalize scale
    let pose_size = tf.maximum(
      tf.mul(torso_size, torso_size_multiplier),
      max_dist
    );
    return pose_size;
  }

  function normalize_pose_landmarks(landmarks: any) {
    let pose_center = get_center_point(
      landmarks,
      POINTS.LEFT_HIP,
      POINTS.RIGHT_HIP
    );
    pose_center = tf.expandDims(pose_center, 1);
    pose_center = tf.broadcastTo(pose_center, [1, 17, 2]);
    landmarks = tf.sub(landmarks, pose_center);

    let pose_size = get_pose_size(landmarks);
    landmarks = tf.div(landmarks, pose_size);
    return landmarks;
  }

  function landmarks_to_embedding(landmarks: any) {
    // normalize landmarks 2D
    landmarks = normalize_pose_landmarks(tf.expandDims(landmarks, 0));
    let embedding = tf.reshape(landmarks, [1, 34]);
    return embedding;
  }
  // Pro-Processing arrays of images function ends

  // To run self-trained poses classification Model
  const detectPose = async (
    detector: any,
    poseClassifier: any,
    currentPose: any
  ) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      //@ts-ignore
      webcamRef.current.video.readyState === 4
    ) {
      // console.log({ currentPose });
      let notDetected = 0;
      //@ts-ignore
      const video = webcamRef.current.video;
      const pose = await detector.estimatePoses(video);
      //@ts-ignore
      const ctx = canvasRef.current.getContext("2d");
      //@ts-ignore
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      try {
        const keyPoints = pose[0].keypoints;
        //@ts-ignore
        let input = keyPoints.map((keyPoint) => {
          if (keyPoint.score > 0.4) {
            if (
              !(keyPoint.name === "left_eye" || keyPoint.name === "right_eye")
            ) {
              drawPoint(ctx, keyPoint.x, keyPoint.y, 8, defaultColor);
              //@ts-ignore
              let connections = keyPointConnections[keyPoint.name];
              try {
                //@ts-ignore
                connections.forEach((connection) => {
                  let conName: string = connection.toUpperCase();
                  //@ts-ignore
                  let pointX = keyPoints[POINTS[conName]].x;
                  //@ts-ignore
                  let pointY = keyPoints[POINTS[conName]].y;
                  drawSegment(
                    ctx,
                    [keyPoint.x, keyPoint.y],

                    [pointX, pointY],
                    skeletonColor
                  );
                });
              } catch (err) { }
            }
          } else {
            notDetected += 1;
          }
          return [keyPoint.x, keyPoint.y];
        });
        if (notDetected > 4) {
          skeletonColor = defaultColor;
          return;
        }
        const processedInput = landmarks_to_embedding(input);
        const classification = poseClassifier.predict(processedInput);

        classification.array().then((data: any) => {
          //@ts-ignore

          const classNo = +currentPose.id - 1;

          if (data[0][classNo] > 0.9) {
            if (!flag) {
              setStartingTime(new Date(Date()).getTime());
              flag = true;
              // console.log("data[0][classNo:",data[0][classNo]);
            }

            setCurrentTime(new Date(Date()).getTime());
            skeletonColor = rightPoseColor;
          } else {
            flag = false;
            skeletonColor = "rgb(255,255,255)";
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // To run TensorFlow MoveNet Model
  const runMoveNet = useCallback(
    async (currentPose) => {
      // To import TensorFlow MoveNet Model
      const detectorConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
      };
      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        detectorConfig
      );

      // To import self-trained poses classification Model
      // Trained kernels model is transferred. Both model.json and group1-shard1of1.bin are needed.
      const poseClassifier = await tf.loadLayersModel(
        `${REACT_APP_API_SERVER}/assets/AiClassification/modelV3.json`
      );

      // CODE REVIEW: Take Lifecycle into consideration. If the user left the page without "stop pose", the interval will keep running.

      return (interval = setInterval(() => {
        detectPose(detector, poseClassifier, currentPose);
      }, 100));
    },
    []
  );

  // CODE REVIEW: Recommend do this way
  // useEffect(() => {
  //   if (isStartPose === true) {
  //     let interval = runMoveNet();
  //     return () => {
  //       clearInterval(interval)
  //     }
  //   }
  // }, [isStartPose, runMoveNet])

  function startYoga() {
    setIsStartPose(true);
    runMoveNet(currentPose);
  }

  async function stopPose() {
    if (isAuthenticated && poseTime > 0) {
      setIsStartPose(false);
      let res = await insertPoseRecord(poseTime, currentPose.id);
      let result = await res.json();
      if (result.success) {
        showMsgAlert("success", result.msg);
        getPoseRecord();
      }
      clearInterval(interval);
    } else {
      setIsStartPose(false);
      clearInterval(interval);
    }
  }

  if (isStartPose) {
    return (
      <div className="container">
        <div className="Timer d-flex">
          <div>
            <div className={AI_gameStyles.posePerformance}>
              <h4 className={AI_gameStyles.poseToDo}>
                Detecting Pose: {convertToTitleCase(currentPose.name)}
              </h4>
              <h4>Pose Time: {poseTime} s</h4>

              {/* <h4>Best: {bestPerform} s</h4> */}
              <Button onClick={stopPose} className={AI_gameStyles.stopPoseBtn}>
                Stop Pose
              </Button>
            </div>
          </div>
          <div className={AI_gameStyles.posePerformance}>
            <h4 className="my-2">Right Pose to do:</h4>
            <img
              src={
                REACT_APP_API_SERVER +
                `/assets/AiClassification/poses/${currentPose.name}.jpg`
              }
              width="250"
              alt={currentPose.name}
            />
          </div>
        </div>

        <div className="position-relative col-md-6">
          <Webcam
            width="640px"
            height="480px"
            id="webcam"
            ref={webcamRef}
            className={AI_gameStyles.webCamAndCanvas}
          />
          <canvas
            ref={canvasRef}
            id="my-canvas"
            width="640px"
            height="480px"
            className={AI_gameStyles.canvasOnly}
          ></canvas>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="yoga-container d-flex justify-content-center">
        <div className="d-flex flex-wrap justify-content-center">
          <div className="col-md-4 poseImage">
            <span className="text-center">
              <div className="">
                <h5 className={AI_gameStyles.poseToDo}>Pose to do:</h5>
                <img
                  src={
                    REACT_APP_API_SERVER +
                    `/assets/AiClassification/poses/${currentPose.name}.jpg`
                  }
                  width="250"
                  alt={currentPose.name}
                />
              </div>
              <h5 className={AI_gameStyles.poseToDo}>
                {convertToTitleCase(currentPose.name)}
              </h5>
              {poses.length > 0 && (
                <PosesDropDown
                  className={AI_gameStyles.dropdownMenu}
                  // poseList={poseList}
                  poses={poses}
                  onChangeCurrentPose={(pose: any) => {
                    setCurrentPose(pose);
                  }}
                />
              )}
            </span>
          </div>
          <span className="col-md-1 d-flex justify-content-center"></span>
          <div className="col-md-7 poseInstruction poseControl">
            <div className={AI_gameStyles.steps}>
              <h5>How to start:</h5>
              <div id="step1">
                1. Choose a pose you would like to try in the Dropdown.
              </div>
              <br />
              <div id="step1">
                2. Click "Start Pose Detection" below, Allow us to access the
                camera, and Wait for the webcam to load.
              </div>
              <br />
              {/* <img src="../admin/useYourCam.png" alt="use Your Cam" height="120" width="auto"> */}
              <div id="step2">
                3. Perform the same pose as the image on the right, making sure
                to face the same direction.
              </div>
              <br />
              <div id="step3">
                4. Hold your pose as long as you can, and your best record shall
                be displayed.
              </div>
              <br />
            </div>
            <div className="d-flex justify-content-center">
              <Button onClick={startYoga} className={AI_gameStyles.startPosing}>
                Start Pose Detection
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isAuthenticated && (
        <div className="container" style={{ marginTop: "5rem" }}>
          <PoseRecord
            summaryData={postRecord.summaryData}
            allRecordData={postRecord.allRecordData}
            onDeleteRecord={(id) => getDeletePoseRecordInfo(id)}
          />

          <Dialog
            visible={isOpenDeleteRecordDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Confirm"
            modal
            onHide={() => {
              setIsOpenDeleteRecordDialog(false);
            }}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />

              <span> Are you sure you want to delete this record?</span>
              <div
                className="d-flex justify-content-center"
                style={{ marginTop: "1rem" }}
              >
                <Button
                  className={AI_gameStyles.startPosing}
                  onClick={() => deletePoseRecord()}
                >
                  Confirmed
                </Button>
                <Button
                  variant="secondary"
                  style={{ marginLeft: "2rem" }}
                  onClick={() => {
                    setIsOpenDeleteRecordDialog(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Dialog>
        </div>
      )}
    </div>
  );
}
