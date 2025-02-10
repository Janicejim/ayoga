import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IRootState } from "../redux/store";
import { changeIsTeacherMode, logout } from "../redux/auth/actions";
import styles from "../css/YogaNavBar.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";



export function YogaNavBar() {
  const { user } = useSelector((state: IRootState) => state.auth);
  const [expandNav, setExpandNav] = useState(false);
  // const { name } = useSelector((state: IRootState) => state.userInfo);

  const isTeacherMode = useSelector(
    (state: IRootState) => state.auth.isTeacherMode
  );

  // console.log(icon, name, credit)
  const isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticate
  );
  const dispatch = useDispatch();

  const ToAutoCloseInMd = () => {
    if (window.innerWidth < 768) {
      setExpandNav(expandNav ? false : true);
      return;
    }
  };




  const AutoCandL = function AutoCloseAndLogout() {
    ToAutoCloseInMd();
    dispatch(logout());
    return;
  };

  return (
    <div className="">
      <span
        className={`d-flex justify-content-between align-items-center ${styles.marginForPage} `}
      >
        <Navbar.Brand>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Link to="/" className="">
              <img
                className={styles.icon}
                style={{ width: "4rem", height: "4rem" }}
                src={require("../assets/logo.png")}
                alt="AYoga logo"
              />
            </Link>
            <div>AYOGA</div>
          </div>
        </Navbar.Brand>
        <div className="d-flex">
          <Navbar
            expanded={expandNav}
            collapseOnSelect
            expand="md"
            // bg="white"
            variant="light"
            className="justify-content-end py-2 px-0"
          >
            <Navbar.Toggle
              onClick={ToAutoCloseInMd}
              aria-controls="responsive-navbar-nav"
              className={styles.navMobile}
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
                <div className={styles.mobileItem}>
                  {user.role !== "admin" && (
                    <>
                      {" "}
                      <Nav>
                        <Link onClick={ToAutoCloseInMd} to="/classes">
                          <Button className={styles.keyButton}>
                            Find Class
                          </Button>
                        </Link>
                      </Nav>
                      <Nav>
                        <Link onClick={ToAutoCloseInMd} to="/AiGame">
                          <Button className={styles.navBtn}>
                            AI Yoga Coach
                          </Button>
                        </Link>
                      </Nav>
                    </>
                  )}
                  {isAuthenticated && user.role !== "admin" && (
                    <>
                      {isTeacherMode && (
                        <Nav>
                          <Link className={styles.navBtn} onClick={ToAutoCloseInMd} to="/create">
                            Create a class
                          </Link>
                        </Nav>
                      )}
                    </>
                  )}
                  {!isAuthenticated && (
                    <>
                      <Nav>
                        <Link className={styles.navBtn} onClick={ToAutoCloseInMd} to="/login">
                          Login
                        </Link>
                      </Nav>
                      <Nav>
                        <Link className={styles.navBtn} onClick={ToAutoCloseInMd} to="/register">
                          Register
                        </Link>
                      </Nav>
                    </>
                  )}
                  {isAuthenticated && (
                    <>
                      {user.role !== "admin" && (
                        <>
                          {user.role !== "teacher" && (
                            <Nav>
                              <Link
                                onClick={ToAutoCloseInMd}
                                className={styles.navBtn}
                                to="/teacher/apply"
                              >
                                Become Teacher
                              </Link>
                            </Nav>
                          )}
                          <Nav>
                            <Link className={styles.navBtn} onClick={ToAutoCloseInMd} to="/package">
                              Buy Credit
                            </Link>
                          </Nav>

                          <Nav>
                            <Link className={styles.navBtn} onClick={ToAutoCloseInMd} to="/withdrawal">
                              Withdrawal Credit
                            </Link>
                          </Nav>
                          <Nav>
                            <Link className={styles.navBtn} onClick={ToAutoCloseInMd} to="/userInfo">
                              User
                            </Link>
                          </Nav>
                        </>
                      )}

                      <Nav>
                        <Link className={styles.navBtn} onClick={AutoCandL} to="/">
                          Logout
                        </Link>
                      </Nav>
                    </>
                  )}
                  {user.role === "teacher" && (
                    <Nav>
                      <div className="flex justify-content-center align-items-center mb-4 gap-2">
                        <InputSwitch
                          inputId="input-rowclick"
                          checked={isTeacherMode}
                          onChange={(e: InputSwitchChangeEvent) =>
                            // setIsTeacherMode(e.value!)
                            dispatch(changeIsTeacherMode())
                          }
                        />
                        <label htmlFor="input-rowclick">
                          {isTeacherMode ? "Teacher" : "User"}
                        </label>
                      </div>
                    </Nav>

                  )}
                </div>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>

      </span>
    </div>
  );
}
