import React, { useState } from "react";
import tanmay from "../../assets/img/dashboard_img/tanmay.png";
import { FaPen } from "react-icons/fa6";
import "../../pages/produce/dashboard.css";
// import style from "../../pages/produce/dashboard.module.css";

function ProfileEdit({ setEditProfile, editProfile }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleLabelClick = (event) => {
    event.preventDefault();
    // Trigger the hidden file input
    const fileInput = document.getElementById("upload-input");
    fileInput.click();
  };

  // user data
  const [projectUserData, setProjectUserData] = useState({
    name: " tanmay",
    role: "dj",
    dateOfBirth: "",
    gender: "Male",
    Mob: "1231231230",
    emal: "sample@gmail.com",
  });

  return (
    <>
      <div
        className={`test-overlay ${editProfile ? "test-overlay-after" : ""}`}
      ></div>
      <div
        className={`choira_edit_profile ${
          editProfile ? "choira_edit_profile-after" : ""
        }`}
      >
        <div>
          <div>
            <div>Profile Details</div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                setEditProfile(false);
              }}
            >
              x
            </div>
          </div>

          {/* <div className="chnageimg">
            <div>
              <img src={tanmay} alt="" />
            </div>
            <div className="upload_image ">
              <FaPen />
            </div>
          </div> */}

          <div className="edit-profile-container">
            <div className="change-img">
              <div>
                {selectedImage ? (
                  <img src={selectedImage} alt="Uploaded" />
                ) : (
                  <img src={tanmay} alt="Default" />
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="upload-input"
                className="upload-image"
                onClick={handleLabelClick}
              >
                <FaPen />
              </label>
              <input
                type="file"
                id="upload-input"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="name">Name</label> <br />
              <input id="name" type="text" placeholder="Tanmay" />
            </div>
            <div>
              <label htmlFor="role">Role</label> <br />
              <input name="role" id="role" type="text" placeholder="Tanmay" />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="bd">Date Of Birth</label> <br />
              <input id="bd" type="date" placeholder="Tanmay" />
            </div>
            <div>
              <label htmlFor="Gender">Gender</label> <br />
              <select name="" id="Gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div>
            <div className="choira_test_number">
              <label htmlFor="mobile">Mobile Number</label> <br />
              <input id="mobile" type="text" placeholder="Tanmay" />
              <div>+91 |</div>
            </div>
            <div>
              <label htmlFor="email">Email</label> <br />
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Tanmay"
              />
            </div>
          </div>
          <div>
            <button>save</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileEdit;
