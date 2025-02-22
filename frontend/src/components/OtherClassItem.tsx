import styles from "../css/class_details.module.css";
import { Link } from "react-router-dom";
import moment from "moment";
import { useEffect, useState } from "react";
import { REACT_APP_UPLOAD_IMAGE } from "../utils/config";
import { getDataNotLogin } from "../api/api";
import { ClassItem } from "../utils/models";


interface Props {
  teacherId: number;
  excludeClassId?: number;
}
function OtherClassItems(props: Props) {
  const [otherClassItems, setOtherClassItems] = useState<ClassItem[]>([])

  const rolling = () => {
    window.scrollTo(0, 0);
  };

  const getOtherClass = async () => {
    let path = ""
    props.excludeClassId ? path = `api/class/teacher/${props.teacherId}?classId=${props.excludeClassId}` : path = `api/class/teacher/${props.teacherId}`
    const result = await getDataNotLogin(path)
    if (result.success) {
      setOtherClassItems(result.data)
    }
  }

  useEffect(() => {

    getOtherClass()


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.teacherId, props.excludeClassId]);

  return (
    <div>
      <div className="row row-cols-1 row-cols-md-4">
        {otherClassItems.length > 0 ?
          otherClassItems.map((item, itemIndex: number) => {
            return (
              <div className="col" key={itemIndex}>
                <div className={`card ${styles.productCard}`}>
                  <div className={styles.imgContainer}>
                    <Link onClick={rolling} to={`/class/detail/${item.id}`}>
                      <img
                        src={`${REACT_APP_UPLOAD_IMAGE}/${item.image}`}
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
                        item.start_time}
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
          }) : <div className={styles.otherTitle}>
            You may also try these from this instructor
          </div>
        }
      </div>

      { }
    </div>
  );
}
export default OtherClassItems;
