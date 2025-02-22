import { Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { IRootState } from "../redux/store";
import { changeIsTeacherMode, logout } from "../redux/auth/actions";
import styles from "../css/yogaNavBar.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";



export function YogaNavBar() {
  const { user } = useSelector((state: IRootState) => state.auth);
  const [expandNav, setExpandNav] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop()
  const isTeacherMode = useSelector(
    (state: IRootState) => state.auth.isTeacherMode
  );

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
          <div >
            <Link to="/" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img
                className={styles.icon}
                style={{ width: "4rem", height: "4rem" }}
                src={require("../assets/logo.png")}
                alt="Ayoga logo"
              />
              <div>AYOGA</div>
            </Link>

          </div>
        </Navbar.Brand>
        <div className="d-flex">
          <Navbar
            expanded={expandNav}
            collapseOnSelect
            expand="md"
            variant="light"
            className="justify-content-end py-2 px-0"
          >
            <Navbar.Toggle
              onClick={ToAutoCloseInMd}
              aria-controls="responsive-navbar-nav"
              className={styles.navMobile}
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              <>
                {!isAuthenticated ? (
                  <>
                    <Nav>
                      <Link to="/class/find" className={currentPath === "find" ? styles.activeButton : styles.navBtn}>
                        Find Class
                      </Link>
                    </Nav>
                    <Nav>
                      <Link className={currentPath === "login" ? styles.activeButton : styles.navBtn} onClick={ToAutoCloseInMd} to="/login">
                        Login
                      </Link>
                    </Nav>
                    <Nav>
                      <Link className={currentPath === "register" ? styles.activeButton : styles.navBtn} onClick={ToAutoCloseInMd} to="/register">
                        Register
                      </Link>
                    </Nav>
                  </>
                ) : user.role === "admin" ? (
                  <>
                    <Nav>
                      <Link className={styles.navBtn} onClick={AutoCandL} to="/">
                        Logout
                      </Link>
                    </Nav>
                  </>) : user.role === "teacher" ? (
                    <>
                      {isTeacherMode ? <Nav>
                        <Link className={currentPath === "create" ? styles.activeButton : styles.navBtn} to="/class/create">
                          Create Class
                        </Link>
                      </Nav>
                        :
                        <>
                          <Nav>
                            <Link className={currentPath === "find" ? styles.activeButton : styles.navBtn} to="/class/find">
                              Find Class
                            </Link>
                          </Nav>
                          <Nav>
                            <Link className={currentPath === "ai" ? styles.activeButton : styles.navBtn} to="/ai">
                              AI Yoga Coach
                            </Link>
                          </Nav>

                          <Nav>
                            <Link className={currentPath === "package" ? styles.activeButton : styles.navBtn} to="/package">
                              Buy Credit
                            </Link>
                          </Nav>
                        </>
                      }
                      <Nav>
                        <Link className={currentPath === "withdrawal" ? styles.activeButton : styles.navBtn} to="/credit/withdrawal">
                          Withdrawal Credit
                        </Link>
                      </Nav>
                      <Nav>
                        <Link className={currentPath === "info" ? styles.activeButton : styles.navBtn} to="/info">
                          Info
                        </Link>
                      </Nav>
                      <Nav>
                        <Link className={styles.navBtn} onClick={AutoCandL} to="/">
                          Logout
                        </Link>
                      </Nav>
                      <Nav>
                        <div className={styles.switch}>
                          <InputSwitch
                            inputId="input-rowclick"
                            checked={isTeacherMode}
                            onChange={(e: InputSwitchChangeEvent) =>
                              dispatch(changeIsTeacherMode())
                            }
                          />
                          <label htmlFor="input-rowclick" style={{ marginLeft: "2px", color: "gray" }}>
                            {isTeacherMode ? "Teacher Mode" : "User Mode"}
                          </label>
                        </div>
                      </Nav>
                    </>
                  ) : (
                  <>
                    <Nav>
                      <Link className={currentPath === "find" ? styles.activeButton : styles.navBtn} to="/class/find">
                        Find Class
                      </Link>
                    </Nav>
                    <Nav>
                      <Link className={currentPath === "ai" ? styles.activeButton : styles.navBtn} to="/ai">
                        AI Yoga Coach
                      </Link>
                    </Nav>

                    <Nav>
                      <Link className={currentPath === "package" ? styles.activeButton : styles.navBtn} to="/package">
                        Buy Credit
                      </Link>
                    </Nav>

                    <Nav>
                      <Link className={currentPath === "withdrawal" ? styles.activeButton : styles.navBtn} to="/credit/withdrawal">
                        Withdrawal Credit
                      </Link>
                    </Nav>
                    <Nav>
                      <Link className={currentPath === "info" ? styles.activeButton : styles.navBtn} to="/info">
                        Info
                      </Link>
                    </Nav>
                    <Nav>
                      <Link
                        className={currentPath === "apply" ? styles.activeButton : styles.navBtn}
                        to="/teacher/apply"
                      >
                        Become Teacher
                      </Link>
                    </Nav>
                    <Nav>
                      <Link className={styles.navBtn} onClick={AutoCandL} to="/">
                        Logout
                      </Link>
                    </Nav>
                  </>)

                }
              </>
            </Navbar.Collapse>
          </Navbar>
        </div>

      </span>
    </div>
  );
}
