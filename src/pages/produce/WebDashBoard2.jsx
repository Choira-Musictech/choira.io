import React, { useState } from "react";
import style from "../produce/dashboard.module.css";
import logo from "../../assets/img/logo-choira.svg";
import create from "../../assets/img/dashboard_img/create.svg";
import produce from "../../assets/img/dashboard_img/produce_selected.svg";
import community from "../../assets/img/dashboard_img/community.svg";
import tanmay from "../../assets/img/dashboard_img/tanmay.png";
import ProfileEdit from "./ProfileEdit";
import { useNavigate } from "react-router-dom";

function WebDashboard2({ tabCount, setTabCount, navCount }) {
  if (navCount) {
    setTabCount(navCount);
    // alert(navCount);
  }

  const [editProfile, setEditProfile] = useState(false);
  const editProfiletab = () => {
    setEditProfile(true);
  };
  const navigate = useNavigate();
  const gotoAllStudioDetailPage = () => {
    // navigate("/allStudioPageDetailsPage");
    if (navCount) {
      navigate("/adminDashboard");
    } else {
      setTabCount(3);
    }
  };
  const gotoBookings = () => {
    if (navCount) {
      navigate("/adminDashboard");
    } else {
      setTabCount(4);
    }
  };
  const gotoStudios = () => {
    // navigate("/studios");
    if (navCount) {
      navigate("/adminDashboard");
    } else {
      setTabCount(1);
    }
  };

  return (
    <>
      <ProfileEdit editProfile={editProfile} setEditProfile={setEditProfile} />
      <div className={style.sidebar}>
        <div className={style.sidebarMain}>
          <div className={style.section1}>
            <div>
              <img src={logo} alt="" />
            </div>
            <div className={style.community}>
              <div
                className={tabCount === 1 ? style.tabActive : style.padding}
                onClick={gotoStudios}
              >
                <img src={community} alt="" />
                Studios
              </div>
              <div
                className={tabCount === 2 ? style.tabActive : style.padding}
                onClick={() => {
                  if (navCount) {
                    navigate("/adminDashboard");
                  } else {
                    setTabCount(2);
                  }
                }}
              >
                <img src={produce} alt="" />
                Produce
              </div>
              <div
                className={tabCount === 3 ? style.tabActive : style.padding}
                onClick={gotoAllStudioDetailPage}
              >
                <img src={produce} alt="" />
                App & More
              </div>
              <div
                className={tabCount === 4 ? style.tabActive : style.padding}
                onClick={gotoBookings}
              >
                <img src={produce} alt="" />
                Bookings
              </div>
            </div>
          </div>

          <div className={style.section2}>
            <div
              className={style.section2Main}
              style={{ cursor: "pointer" }}
              onClick={editProfiletab}
            >
              <div>
                <img src={tanmay} alt="" />
              </div>
              <div>
                <h5>Tanmay</h5> <br />
                <h6>Music Producer</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WebDashboard2;
