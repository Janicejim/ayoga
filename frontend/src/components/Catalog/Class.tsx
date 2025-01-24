import moment from "moment";
import { Link } from "react-router-dom";
import styles from "../../css/CatalogCard.module.css";
import { motion } from "framer-motion";

export function Class(props: any) {
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

      <div className={`card h-100 ${styles.productCard}`}>
        <div className={styles.imgContainer}>
          <Link to={`/class/detail/${id}`}>
            <img
              src={`${process.env.REACT_APP_API_SERVER}/${image}`}
              className={`card-img-top ${styles.cardStyle}`}
              alt={image}
            />
          </Link>
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
        <hr />
      </div>

    </motion.div>
  );
}
