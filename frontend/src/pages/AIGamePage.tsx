import { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import { Button } from "react-bootstrap";
import { DropDown } from "../components/DropDown";
import AI_gameStyles from "../css/aiGame.module.css";
import { convertToTitleCase } from "../utils/convertTitle";
import { REACT_APP_API_SERVER, REACT_APP_UPLOAD_IMAGE } from "../utils/config";
import { getData } from "../api/api";
import { Pose } from "../utils/models";


const defaultColor = "rgb(255,255,255)";
const rightPoseColor = "green";

let skeletonColor = defaultColor;

let interval: NodeJS.Timer;


let flag = false;

export default function AIGamePage() {
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState("red");
  const [currentPose, setCurrentPose] = useState<Pose>({ id: 1, name: "Bow pose", image: "bow.jpg", detect_id: 2 });
  const [isStartPose, setIsStartPose] = useState(false);
  const [poses, setPoses] = useState<Pose[]>([]);
  const [msg, setMsg] = useState<string>("Loading Model, please wait...");



  async function getPoses() {
    let posesResult = await getData(`api/user/poses`);
    if (posesResult.success) {
      setPoses(posesResult.data);
    }
  }

  useEffect(() => {
    getPoses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    left_wrist: ["left_wrist"],
    right_wrist: ["right_wrist"],
    right_ankle: ["right_ankle"],
    left_ankle: ["left_ankle"],
  };


  // Draw between the detected 17 key-points
  function drawSegment(
    ctx: CanvasRenderingContext2D,
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
  function drawPoint(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
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

  // To run self-trained poses classification Model
  const detectPose = async (
    detector: poseDetection.PoseDetector,
    poseClassifier: any,
    currentPose: Pose
  ) => {
    try {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video!.readyState === 4
      ) {
        let notDetected = 0;


        // Get Video Properties

        const video = webcamRef.current.video;

        const videoWidth = webcamRef.current.video!.videoWidth;

        const videoHeight = webcamRef.current.video!.videoHeight;

        // Set video width

        webcamRef.current.video!.width = videoWidth;

        webcamRef.current.video!.height = videoHeight;




        const pose = await detector.estimatePoses(video!);

        const ctx = canvasRef.current!.getContext("2d");

        canvasRef.current!.width = videoWidth;

        canvasRef.current!.height = videoHeight;

        ctx!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        const keyPoints = pose[0].keypoints;

        let input = keyPoints.map((keyPoint: poseDetection.Keypoint) => {
          if (keyPoint.score! > 0.4) {
            if (
              !(keyPoint.name === "left_eye" || keyPoint.name === "right_eye")
            ) {

              drawPoint(ctx!, keyPoint.x, keyPoint.y, 8, defaultColor);

              let connections = keyPointConnections[keyPoint.name as keyof typeof keyPointConnections];

              connections.forEach((connection: any) => {
                let conName: string = connection.toUpperCase();
                //@ts-ignore
                let pointX = keyPoints[POINTS[conName]].x;
                //@ts-ignore
                let pointY = keyPoints[POINTS[conName]].y;
                drawSegment(
                  ctx!,
                  [keyPoint.x, keyPoint.y],

                  [pointX, pointY],
                  skeletonColor
                );
              });


            }
          } else {
            notDetected += 1;
          }
          return [keyPoint.x, keyPoint.y];
        });

        if (notDetected > 4) {
          setColor("red")
          setMsg("Pose not match")
          skeletonColor = defaultColor;
          return;
        }
        const processedInput = landmarks_to_embedding(input);
        const classification = poseClassifier.predict(processedInput);

        classification.array().then((data: any) => {
          const classNo = +currentPose.detect_id!;

          if (data[0][classNo] > 0.9) {

            if (!flag) {
              flag = true;
            }
            setColor("green")
            setMsg("Perfect")
            skeletonColor = rightPoseColor;
          } else {
            setColor("red")
            setMsg("Pose not match")

            flag = false;
            skeletonColor = "rgb(255,255,255)";
          }
        });

      }

    } catch (e) {
      console.log(e)
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
        `${REACT_APP_API_SERVER}/modelV3.json`
      );


      return (interval = setInterval(() => {
        detectPose(detector, poseClassifier, currentPose);
      }, 300));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );


  function startYoga() {
    setIsStartPose(true);
    runMoveNet(currentPose);
  }

  async function stopPose() {
    setMsg("")
    setColor("red")
    setIsStartPose(false);
    clearInterval(interval);

  }

  return (
    <div style={{ marginTop: "5rem" }}>
      <div className="yoga-container d-flex justify-content-center ">
        <div className="d-flex flex-wrap justify-content-center">
          <div className="col-md-4 poseImage">
            <span className="text-center">
              <div className="">
                <h5 className={AI_gameStyles.poseToDo}>Pose to do:</h5>
                <img
                  src={
                    `${REACT_APP_UPLOAD_IMAGE}/${currentPose.image}`
                  }
                  width="250"
                  alt={currentPose.name}
                />
              </div>
              <h5 className={AI_gameStyles.poseToDo}>
                {convertToTitleCase(currentPose.name)}
              </h5>
              {poses.length > 0 && !isStartPose && (
                <DropDown
                  // className={AI_gameStyles.dropdownMenu}
                  data={poses}
                  onChangeCurrentItem={(pose: Pose) => {
                    setCurrentPose(pose);
                  }}
                  type="ai"
                />
              )}
            </span>
          </div>
          <span className="col-md-1 d-flex justify-content-center"></span>
          <div className="col-md-7 poseInstruction poseControl">
            <div className="row">
              <div className={`${AI_gameStyles.steps} container`}>
                <h5 style={{ marginTop: "3rem" }}>How to start:</h5>
                <div id="step1">
                  1. Choose a pose you would like to try in the Dropdown.
                </div>
                <br />
                <div id="step1">
                  2. Click "Start Pose Detection" below, Allow us to access the
                  camera, and wait for the webcam to load. Finish loading you will see the white landmark.
                </div>
                <br />
                <div id="step2">
                  3. Perform the same pose as the image on the right, making sure
                  to face the same direction.
                </div>
                <br />
                <div id="step3">
                  4. If your pose is correct, you can see the white landmark change to green color.
                </div>
                <br />
              </div>
              <div className="d-flex justify-content-center">
                {isStartPose ? <Button onClick={stopPose} className="btn-warning">
                  Stop Pose
                </Button>
                  : <Button onClick={startYoga} className={AI_gameStyles.startPosing}>
                    Start Pose Detection
                  </Button>}
              </div>
            </div>

          </div>
        </div>
      </div>
      {isStartPose ? (<><div style={{ marginTop: "2rem" }}>
        <div className={AI_gameStyles.msg} style={{ color: color }}>{msg}</div>

        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />

      </div>      <div style={{ height: "40rem" }}></div></>) : <div style={{ height: "10rem" }}></div>
      }

    </div>
  );
}
