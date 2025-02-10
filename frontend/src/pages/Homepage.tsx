import homeStyles from "../css/homepage.module.css";
import { Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IRootState } from "../redux/store";
import { useSelector } from "react-redux";
import Comments from "../components/Comments";
import { fetchAllClasses } from "../api/class";
import { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import Class from "../components/Class";
import { fetchHighScoreTeachers, fetchNewestComments } from "../api/teacher";
import { Avatar } from "primereact/avatar";
import { REACT_APP_UPLOAD_IMAGE } from "../utils/config";


export default function Homepage() {
  const [classes, setClasses] = useState<any[]>([])
  const [teachers, setTeachers] = useState<any[]>([])
  const [comments, setComments] = useState<any[]>([])
  const isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticate
  );


  async function getClasses() {
    const res = await fetchAllClasses();
    const allClassesResult = await res.json();
    setClasses(allClassesResult.data);
  }

  async function getHighScoreTeachers() {
    const teachers = await fetchHighScoreTeachers();

    setTeachers(teachers.data);
  }

  async function getNewestComments() {
    const comments = await fetchNewestComments();
    setComments(comments.data);
  }

  useEffect(() => {
    getClasses()
    getHighScoreTeachers()
    getNewestComments()
  }, [])


  const classTemplate = (eachClass: any) => {
    return (
      <Class  {...eachClass}
        key={eachClass.id} />
    )
  }


  return (

    <>
      <div className={`${homeStyles.homeBody}`}>
        <div className={` ${homeStyles.titleContainer}`}>
          <div className="container">
            <div className={`col ${homeStyles.title}`}>
              <h1>Enjoy Yoga Together</h1>
              <p className={homeStyles.subTitle}>
                Find yoga instructors near you or practise with our AI powered
                yoga coach.
              </p>
              <br />
              <div>

                {!isAuthenticated && (
                  <Link to="/login">
                    <Button className={homeStyles.regButton}>Login</Button>
                  </Link>
                )}
                {isAuthenticated && (
                  <Link to="/aiGame">
                    <Button className={homeStyles.coachButton}>
                      Practise with AI Coach
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="container">

        <Row className={homeStyles.rowSpace}>

          <div className={homeStyles.titleEnd}>
            <h3 > Class @ AYoga</h3>
            <Link to="/classes"><div>More</div></Link>
          </div>
          {classes.length > 0 && <div className={`card ${homeStyles.classContainer}`}>
            <Carousel value={classes.slice(0, 11)} numVisible={3} numScroll={3} itemTemplate={classTemplate} />
          </div>}
        </Row>

        <Row className={homeStyles.rowSpace} >
          <h3 className={homeStyles.sectionSubTitle}>AI @ AYoga</h3>
          <div className="col-md-8 col-s-12">
            <img className={`${homeStyles.aiImg}`}
              src={require("../assets/yoga-bg-ai.png")}
              alt="ai yoga pic"
            />
          </div>
          <div className={`col-md-4 col-s-12 ${homeStyles.aiBtnArea}`}>
            <Link to="/aiGame">
              <Button className={homeStyles.coachButton}>
                Practise with AI Coach
              </Button>
            </Link>
          </div>
          <div>

            <Row className={homeStyles.rowSpace} >
              <h3 className={homeStyles.sectionSubTitle}>Teacher @ AYoga</h3>
              <div className={homeStyles.flex} >
                {teachers.map((teacher: any) => (
                  <Link style={{ margin: "2rem" }} key={teacher.id} to={`/teacher/${teacher.id}`}>
                    <Avatar image={`${REACT_APP_UPLOAD_IMAGE}/${teacher.photo}`} className="mr-2" size="xlarge" shape="circle" />
                  </Link>
                ))

                } </div>
            </Row>
            <Row className={homeStyles.rowSpace} >
              <Comments data={comments} />
            </Row>
          </div>
        </Row>


      </div>




    </>

  );




}
