import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import styles from "../css/classDetails.module.css";
import { Link } from "react-router-dom";
import moment from "moment";
import { classGetOtherClassInfo } from "../redux/class/thunks";
import { useEffect } from "react";

interface Props {
  teacherId: number;
  excludeClassId?: number;
}
function OtherClassItems(props: Props) {
  const { otherClassItems } = useSelector(
    (state: IRootState) => state.classOtherClass
  );
  const dispatch = useDispatch();
  const rolling = () => {
    window.scrollTo(0, 0);
  };

  const getTeacherClass = async () => {
    if (props.excludeClassId && props.teacherId) {
      dispatch(classGetOtherClassInfo(props.teacherId, props.excludeClassId));
    } else if (props.teacherId) {
      dispatch(classGetOtherClassInfo(props.teacherId));
    }
  };

  useEffect(() => {
    getTeacherClass();
  }, [props.teacherId, props.excludeClassId]);

  return (
    <div>
      <div className="row row-cols-1 row-cols-md-4">
        {otherClassItems.length > 0 &&
          otherClassItems.map((item: any, itemIndex: number) => {
            return (
              <div className="col" key={itemIndex}>
                <div className={`card ${styles.productCard}`}>
                  <div className={styles.imgContainer}>
                    <Link onClick={rolling} to={`/class/detail/${item.class_id}`}>
                      <img
                        src={`${process.env.REACT_APP_UPLOAD_IMAGE}/${item.image}`}
                        className={`card-img-top ${styles.cardImg}`}
                        alt="..."
                      />
                    </Link>
                  </div>
                  <div className="card-body">
                    <h5 className={styles.cardTitle}>{item.name}</h5>
                    <p className={styles.scoreText}>
                      {item.date !== "Loading" &&
                        moment(`${item.date}`).format("ddd, Do MMM YYYY") +
                        ", " +
                        item.time}
                    </p>
                    <p className={styles.cardText}>
                      Instructor: {item.instructor}
                    </p>

                    <p className={styles.cardText}>Type: {item.type}</p>
                    <p className={styles.cardText}>
                      Participants: {item.capacity}/{item.max_capacity}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      { }
    </div>
  );
}
export default OtherClassItems;
