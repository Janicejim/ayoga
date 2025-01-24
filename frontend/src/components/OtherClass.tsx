import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../redux/store";
import { useEffect } from "react";
import { getOtherClassInfo } from "../redux/otherClass/thunks";
import { useParams } from "react-router";
import styles from "../css/OtherClass.module.css";
import { Link } from "react-router-dom";
import moment from "moment";

export default function OtherClasses() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const teacher_id = parseInt(id);
  const { otherClassItems } = useSelector(
    (state: IRootState) => state.otherClass
  );
  // console.log("otherClassItems", otherClassItems);
  let item = otherClassItems[0];

  useEffect(() => {
    const result = async () => {
      dispatch(getOtherClassInfo(teacher_id));
    };
    result();
  }, [dispatch, teacher_id]);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className={styles.pageTitle}>Other Classes</h2>
            <div className={styles.packageTitle}>From {item?.instructor}</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {otherClassItems &&
            otherClassItems.map((item, itemIndex) => {
              return (
                <div className="col" key={itemIndex}>
                  <div className={`card ${styles.productCard}`}>
                    <div className={styles.imgContainer}>
                      <Link to={`/class/detail/${item.class_id}`}>
                        <img
                          src={`${item.image}`}
                          className={`card-img-top`}
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
                      <p className={styles.cardText}>location: {item.venue}</p>
                      <p className={styles.cardText}>
                        Participants: {item.capacity}/{item.max_capacity}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
