import moment from "moment";
import { Link } from "react-router-dom";
import styles from "../css/class.module.css";
import { motion } from "framer-motion";
import { REACT_APP_UPLOAD_IMAGE } from "../utils/config";

export default function Class(props: any) {
  const {
    id,
    image,
    name,
    date,
    start_time,
    instructor,
    language,
    type,
    yoga_type,
    class_number,
    credit,

  } = props;


  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}

    >
      <Link to={`/class/detail/${id}`}>
        <div className={`card h-100 ${styles.productCard}`}>
          <div className={styles.imgContainer}>

            <img
              src={`${REACT_APP_UPLOAD_IMAGE}/${image}`}
              className={`card-img-top ${styles.cardStyle}`}
              alt={image}
            />

          </div>

          <div className={`card-body ${styles.cardBodyStyle}`}>
            <h5 className={styles.cardTitle}>{`${class_number}_${name}`}</h5>
            <p className={styles.scoreText}>
              {date !== "Loading" &&
                moment(`${date}`).format("ddd, Do MMM YYYY") + ", " + start_time}
            </p>
            <p className={styles.cardText}>Instructor: {instructor}</p>
            <p className={styles.cardText}>Language:{language}</p>
            <p className={styles.cardText}>Class Mode:{type}</p>


            <p className={styles.cardText}>Yoga Type:{yoga_type}</p>

            <p className={styles.cardText}>Credit:{credit}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
