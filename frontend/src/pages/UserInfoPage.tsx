import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../redux/store";
import { useEffect, useState } from "react";
import userInfoStyle from "../css/info.module.css";
import defaultIcon from "../assets/avatar-big.png";
import { getBoxInfo } from "../redux/userInfo/thunks";
import { Link } from "react-router-dom";
import MyCalendar from "../components/Calender";
import { Button } from "react-bootstrap";
import { TabView, TabPanel } from "primereact/tabview";
import Class from "../components/Class";
import { AnimatePresence, motion } from "framer-motion";
import { REACT_APP_UPLOAD_IMAGE } from "../utils/config";
import FileInputWithCamera from "../components/FileInputWithCamera";
import { resize } from "../utils/resize";
import { showMsgAlert } from "../utils/alert";
import { getData, postOrPatchWithMedia } from "../api/api";
import { ClassItem } from "../utils/models";




export default function UserInfoPage() {

  const dispatch = useDispatch();
  const { icon, name, credit } = useSelector(
    (state: IRootState) => state.userInfo
  );
  const [bookingInProgressItem, setBookingInProgressItem] = useState<ClassItem[]>();
  const [bookingIsEndItem, setBookingIsEndItem] = useState<ClassItem[]>();
  const [bookingIsRated, setBookingIsRated] = useState<ClassItem[]>();
  const [bookingUnrated, setBookingUnrated] = useState<ClassItem[]>();
  const [bookmarkItem, setBookmarkItem] = useState<ClassItem[]>();
  const [hostInProcessItem, setHostInProcessItem] = useState<ClassItem[]>();
  const [hostIsEndItem, setHosIsEndItem] = useState<ClassItem[]>();
  const [showItem, setShowItem] = useState(false);
  const isTeacherMode = useSelector(
    (state: IRootState) => state.auth.isTeacherMode
  );
  async function getBookingInfo() {
    const bookingResult = await getData(`api/user/booked`);
    if (bookingResult.success) {
      let inProgress = bookingResult.data.filter((classItem: ClassItem) => !classItem.is_end)
      let end = bookingResult.data.filter((classItem: ClassItem) => classItem.is_end)
      let rated = bookingResult.data.filter((classItem: ClassItem) => classItem.is_end && classItem.comment)
      let unrated = bookingResult.data.filter((classItem: ClassItem) => classItem.is_end && !classItem.comment)
      setBookingInProgressItem(inProgress);
      setBookingIsEndItem(end)
      setBookingIsRated(rated)
      setBookingUnrated(unrated)
    }
  }

  async function getBookmarkInfo() {
    const bookmarkResult = await getData(`api/user/bookmark`);;
    if (bookmarkResult.success) {
      setBookmarkItem(bookmarkResult.data);
    }
  }

  async function userHostData() {
    const hostResult = await getData(`api/user/host`);
    if (hostResult.success) {
      let inProgress = hostResult.data.filter((classItem: ClassItem) => !classItem.is_end)
      let end = hostResult.data.filter((classItem: ClassItem) => classItem.is_end)
      setHostInProcessItem(inProgress);
      setHosIsEndItem(end)
    }
  }
  const handleIconSelect = async (file: File) => {
    let formData = new FormData()
    formData.append("icon", await resize(file))

    let result = await postOrPatchWithMedia("PATCH", `api/user/profile/pic`, formData)
    if (!result.success) {
      showMsgAlert("error", result.msg)
      return
    }
    showMsgAlert("success", "Updated icon success ")
    setTimeout(() => {
      dispatch(getBoxInfo());
    }, 1000);
  };

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
                alt="user profile pic"
                key={defaultIcon}
              />
            ) : (
              <img
                className={userInfoStyle.userIcon}
                src={`${REACT_APP_UPLOAD_IMAGE}/${icon}`}
                alt="user profile pic"
                key={icon}
              />
            )}

            <div className={userInfoStyle.camIcon}>     <FileInputWithCamera onFileSelect={handleIconSelect} /></div>

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
                  <TabPanel header="In progress">
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
                      {bookingInProgressItem && bookingInProgressItem.length < 1 && <a className={userInfoStyle.linkText} href="/class/find">
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
                  {(bookingIsRated && bookingIsRated.length > 0) && (
                    <TabPanel header="Rated">
                      <div className="d-flex flex-wrap">
                        {bookingIsRated.map(eachClass =>
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
                  )}

                  {(bookingUnrated && bookingUnrated.length > 0) && (
                    <TabPanel header="Unrated">
                      <div className="d-flex flex-wrap">
                        {bookingUnrated.map(eachClass =>
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
                  )}

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
                {bookmarkItem && bookmarkItem.length < 1 && <a className={userInfoStyle.linkText} href="/class/find">
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
