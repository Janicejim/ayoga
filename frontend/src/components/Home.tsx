import homeStyles from "../css/landing.module.css";
// import myVideo from "../assets/video-yoga-bg.mp4";
import { Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IRootState } from "../redux/store";
import { useSelector } from "react-redux";
import Carousel from 'react-bootstrap/Carousel';
import Comments from "./Class/Comments";

export function Home() {
  const comments = [{ id: 1, comment: "very good teacher", star: 5, name: "peter", icon: null, updated_at: "20250120" }, { id: 2, comment: "very good teacher", star: 5, name: "peter", icon: null, updated_at: "20250120" }]
  const isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticate
  );

  return (
    //   <div className={`${homeStyles.homeBody}`}>
    //     <div className={` ${homeStyles.titleContainer}`}>
    //       <div className="container">
    //         <div className={`col ${homeStyles.title}`}>
    //           <h1>Book Yoga Classes</h1>
    //           <p>
    //             Find yoga instructors near you or practise with our AI powered
    //             yoga coach.
    //           </p>
    //           <br />
    // <div>
    //   <Link to="/findClass">
    //     <Button className={homeStyles.homeButton}>Find Class</Button>
    //   </Link>{" "}
    //   {!isAuthenticated && (
    //     <Link to="/login">
    //       <Button className={homeStyles.regButton}>Login</Button>
    //     </Link>
    //   )}
    //   {isAuthenticated && (
    //     <Link to="/aiGame">
    //       <Button className={homeStyles.coachButton}>
    //         Practise with AI Coach
    //       </Button>
    //     </Link>
    //   )}
    // </div>
    //         </div>
    //       </div>
    //     </div>


    //     <img className={`${homeStyles.myVideo}`}
    //       src={require("../assets/yoga-bg-mobile.jpg")}
    //       alt="AYoga background"
    //     />

    //   </div>
    <>
      <Carousel >
        <Carousel.Item>
          <img className={`${homeStyles.myVideo}`}
            src={require("../assets/yoga-bg-first.jpg")}
            alt="AYoga background"
          />
          <Carousel.Caption>
            <h3>Book Yoga Classes</h3>
            <p> Find yoga instructors near you</p>
            <div>
              <Link to="/findClass">
                <Button className={homeStyles.homeButton}>Find Class</Button>
              </Link>{" "}
              {!isAuthenticated && (
                <Link to="/login">
                  <Button className={homeStyles.regButton}>Login</Button>
                </Link>
              )}
              {isAuthenticated && (
                <Link to="/aiGame">
                  <Button className={homeStyles.coachButton}>
                    AI Coach
                  </Button>
                </Link>
              )}
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className={`${homeStyles.myVideo}`}
            src={require("../assets/yoga-bg-second.webp")}
            alt="AYoga background"
          />
          <Carousel.Caption>
            <h3>Play With AI</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className={`${homeStyles.myVideo}`}
            src={require("../assets/yoga-bg-third.jpg")}
            alt="AYoga background"
          />
          <Carousel.Caption>
            <h3>Be a yoga teacher</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div >
        <Row >
          <div className={`${homeStyles.iconGroup} col`}>
            <img className={`${homeStyles.icon}`}
              src={require("../assets/join-class-icon.jpg")}
              alt="join class icon"
            />
          </div>
          <div className={`${homeStyles.iconGroup} col`}>
            <img className={`${homeStyles.icon}`}
              src={require("../assets/ai-yoga.webp")}
              alt="ai yoga icon"
            />
          </div>
        </Row>

        <Row >
          <div className={`${homeStyles.iconGroup} col`}>
            <img className={`${homeStyles.icon}`}
              src={require("../assets/join-class-icon.jpg")}
              alt="join class icon"
            />
          </div>
          <div className={`${homeStyles.iconGroup} col`}>
            <img className={`${homeStyles.icon}`}
              src={require("../assets/ai-yoga.webp")}
              alt="ai yoga icon"
            />
          </div>
        </Row>
      </div>

      <div className="container">
        <Comments data={comments} />
      </div>

    </>

  );




}
