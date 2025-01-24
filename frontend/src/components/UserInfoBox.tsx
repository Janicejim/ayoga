import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../redux/store";
import { useEffect, useState } from "react";
import userInfoStyle from "../css/UserInfos.module.css";
import defaultIcon from "../assets/avatar-big.png";
import { getBoxInfo } from "../redux/userInfo/thunks";
import {
  fetchGetBookingInfo,
  fetchGetBookmarkInfo,
  fetchGetHostInfo,
} from "../api/userInfo";
import { Link } from "react-router-dom";
import MyCalendar from "./Calender";
import { Button } from "react-bootstrap";
import { TabView, TabPanel } from "primereact/tabview";
import { Class } from "./Catalog/Class";
import { AnimatePresence, motion } from "framer-motion";

export interface ClassItem {
  image: string;
  name: string;
  date: string;
  time: string;
  instructor: string;
  venue: string;
  max_capacity: number;
  capacity: number;
  id: number;
  end_time: string;
  is_end: boolean
}


export default function InfoBox() {

  const dispatch = useDispatch();
  const { icon, name, credit } = useSelector(
    (state: IRootState) => state.userInfo
  );
  const [bookingInProgressItem, setBookingInProgressItem] = useState<ClassItem[]>();
  const [bookingIsEndItem, setBookingIsEndItem] = useState<ClassItem[]>();
  const [bookmarkItem, setBookmarkItem] = useState<ClassItem[]>();
  const [hostInProcessItem, setHostInProcessItem] = useState<ClassItem[]>();
  const [hostIsEndItem, setHosIsEndItem] = useState<ClassItem[]>();
  const [showItem, setShowItem] = useState(false);
  const isTeacherMode = useSelector(
    (state: IRootState) => state.auth.isTeacherMode
  );

  async function getBookingInfo() {
    const res = await fetchGetBookingInfo();
    const bookingResult = await res.json();
    if (bookingResult.success) {
      let inProgress = bookingResult.data.filter((classItem: any) => !classItem.is_end)
      let end = bookingResult.data.filter((classItem: any) => classItem.is_end)
      setBookingInProgressItem(inProgress);
      setBookingIsEndItem(end)
    }
  }

  async function getBookmarkInfo() {
    const res = await fetchGetBookmarkInfo();
    const bookmarkResult = await res.json();
    if (bookmarkResult.success) {
      setBookmarkItem(bookmarkResult.data);
    }
  }

  async function userHostData() {
    const res = await fetchGetHostInfo();
    const hostResult = await res.json();
    if (hostResult.success) {
      let inProgress = hostResult.data.filter((classItem: any) => !classItem.is_end)
      let end = hostResult.data.filter((classItem: any) => classItem.is_end)
      setHostInProcessItem(inProgress);
      setHosIsEndItem(end)
    }
  }

  useEffect(() => {

    dispatch(getBoxInfo());
    if (!isTeacherMode) {
      getBookingInfo();
      getBookmarkInfo();
    } else {
      userHostData();
    }
  }, [dispatch, isTeacherMode]);


  const openCalendar = () => {
    setShowItem(true);
  };
  const closeCalendar = () => {
    setShowItem(false);
  };

  return (
    <div className="container">
      <div className={`row ${userInfoStyle.userInfoTop}`}>
        <div
          className={`col ${userInfoStyle.userHeaderElem} ${userInfoStyle.userInfo}`}
        >
          <div className={userInfoStyle.avatar}>
            {icon === "undefined" || icon === "" || icon === null ? (
              <img
                className={userInfoStyle.userIcon}
                src={defaultIcon}
                alt="lol"
              />
            ) : (
              <img
                className={userInfoStyle.userIcon}
                src={`${process.env.REACT_APP_API_SERVER}/${icon}`}
                alt="lol"
              />
            )}
          </div>

          <div className={userInfoStyle.userText}>
            <h2>{name}</h2>
            <div>Credit: {credit}</div>
            <Link className={userInfoStyle.linkText} to="/edit/info">
              Edit Info
            </Link>
            <br />
            <Link className={userInfoStyle.linkText} to="/transaction">
              transaction History
            </Link>
            {isTeacherMode &&
              <>
                <br />
                <Link className={userInfoStyle.linkText} to="/revenue">
                  Revenue
                </Link></>
            }

          </div>
        </div>
      </div>
      {isTeacherMode || (
        <>
          <div className={`row ${userInfoStyle.userHeaderElem}`}>
            <div className="col">
              <div className={userInfoStyle.campaignsTitle}>Your Bookings</div>
              <div className="row row-cols-1 row-cols-md-4 g-4 try-container">
                <TabView style={{ width: "100%" }}>
                  <TabPanel style={{ textDecoration: 'none', color: 'inherit' }} header="In progress">
                    <div className="d-flex flex-wrap">
                      {bookingInProgressItem && bookingInProgressItem.length > 0 &&
                        bookingInProgressItem.map(eachClass =>
                          <motion.div
                            key={eachClass.id}
                            layout
                            className="col-md-4 position-relative"
                          >
                            <AnimatePresence>
                              <Class
                                {...eachClass}
                                key={eachClass.id}
                              />
                            </AnimatePresence>
                          </motion.div>
                        )


                      }
                      {bookingInProgressItem && bookingInProgressItem.length < 1 && <a className={userInfoStyle.linkText} href="/findClass">
                        Browse classes near you
                      </a>}
                    </div>
                  </TabPanel>
                  <TabPanel header="End">
                    <div className="d-flex flex-wrap">
                      {bookingIsEndItem && bookingIsEndItem.length > 0 && bookingIsEndItem.map(eachClass =>
                        <motion.div
                          key={eachClass.id}
                          layout
                          className="col-md-4 position-relative"
                        >
                          <AnimatePresence>
                            <Class
                              {...eachClass}
                              key={eachClass.id}
                            />
                          </AnimatePresence>
                        </motion.div>)}


                    </div>
                  </TabPanel>
                </TabView >

              </div>
            </div>
          </div>
          <div className={`row ${userInfoStyle.userHeaderElem}`}>
            <div className="col">
              <div className={userInfoStyle.campaignsTitle}>Your Bookmarks</div>
              <div className="d-flex flex-wrap">
                {bookmarkItem && bookmarkItem.length > 0 && bookmarkItem.map((eachClass) => (


                  <motion.div
                    key={eachClass.id}
                    layout
                    className="col-md-4 position-relative"
                  >
                    <AnimatePresence>
                      <Class
                        {...eachClass}
                        key={eachClass.id}
                      />
                    </AnimatePresence>
                  </motion.div>

                ))}
                {bookmarkItem && bookmarkItem.length < 1 && <a className={userInfoStyle.linkText} href="/findClass">
                  Browse classes near you
                </a>}
              </div>
            </div>
          </div>
        </>
      )}

      {isTeacherMode && (
        <div className={`row ${userInfoStyle.userHeaderElem}`}>
          {showItem ? (
            <div>
              <div className={userInfoStyle.calendarButtonContainer}>
                <Button
                  className={userInfoStyle.calendarButton}
                  onClick={() => closeCalendar()}
                >
                  Hide Calendar
                </Button>
              </div>
              <div>{hostInProcessItem && <MyCalendar hostItems={hostInProcessItem} />}</div>
            </div>
          ) : (
            <div className={userInfoStyle.calendarButtonContainer}>
              <Button
                className={userInfoStyle.calendarButton}
                onClick={() => openCalendar()}
              >
                Show Calendar
              </Button>
            </div>
          )}
          <div className="col">
            <div className={userInfoStyle.campaignsTitle}>
              Classes you're hosting
            </div>
            <div className="row row-cols-1 row-cols-md-4 g-4 try-container">
              <TabView style={{ width: "100%" }}>
                <TabPanel header="In progress">
                  <div className="d-flex flex-wrap">
                    {hostInProcessItem && hostInProcessItem.length > 0 &&
                      hostInProcessItem.map(eachClass =>
                        <motion.div
                          key={eachClass.id}
                          layout
                          className="col-md-4 position-relative"
                        >
                          <AnimatePresence>
                            <Class
                              {...eachClass}
                              key={eachClass.id}
                            />
                          </AnimatePresence>
                        </motion.div>
                      )


                    }
                  </div>
                </TabPanel>
                <TabPanel header="End">
                  <div className="d-flex flex-wrap">
                    {hostIsEndItem && hostIsEndItem.length > 0 && hostIsEndItem.map(eachClass => <motion.div
                      key={eachClass.id}
                      layout
                      className="col-md-4 position-relative"
                    >
                      <AnimatePresence>
                        <Class
                          {...eachClass}
                          key={eachClass.id}
                        />
                      </AnimatePresence>
                    </motion.div>)}
                  </div>
                </TabPanel>
              </TabView >

            </div>

          </div>


        </div>

      )}
    </div>
  );
}
