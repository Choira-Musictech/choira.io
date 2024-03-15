import React, { useEffect } from "react";
import cross from "../../../assets/cross.svg";
import style from "../studios/studio.module.css";
import { MdAddAPhoto, MdOutlineAddBox } from "react-icons/md";

function AddMultipleTeam({ teamDetails, setTeamsDetails, data, isEditMode }) {
  useEffect(() => {
    if (data?.state?.productData?.teamDetails.length)
      setTeamsDetails(data?.state?.productData.teamDetails);
    console.log("datails isssssss", teamDetails);
  }, [data?.state?.productData?.teamDetails?.length]);

  const handleAddTeamDetail = () => {
    const newTeam = { photo: null, name: "", designation: "" };
    setTeamsDetails([...teamDetails, newTeam]);
    console.log(teamDetails);
  };

  const handlePhotoChange = (event, index) => {
    console.log("event.target.files[0]");
    console.log(event.target.files[0]);
    const newTeams = [...teamDetails];
    newTeams[index].photo = event.target.files[0];
    setTeamsDetails(newTeams);
  };

  const handleInputChange = (event, index, field) => {
    const newTeams = [...teamDetails];
    console.log(field);
    newTeams[index][field] = event.target.value;
    console.log(newTeams);
    setTeamsDetails(newTeams);
  };

  const handleCancelImage = (index, type) => {
    const newTeams = [...teamDetails];
    newTeams[index][type] = null;
    setTeamsDetails(newTeams);
  };

  const handleCancelTeam = (index) => {
    console.log("iimmggggg");
    if (teamDetails.length > 1) {
      const newTeams = [...teamDetails];
      newTeams.splice(index, 1);
      setTeamsDetails(newTeams);
    }
  };

  const hideAddPhotoIcon = (team, type) => {
    return team[type] ? { display: "none" } : {};
  };
  return (
    <>
      <div className={style.addTeamDetailDiv}>
        <label htmlFor="Teams">Teams</label>
        {isEditMode ? (
          <>
            <div className={style.addTeamDetailDynamicDiv}>
              {teamDetails.map((team, index) => (
                <div key={index} className={style.addTeamDetailMainDiv}>
                  <div>
                    <label
                      style={{ cursor: "pointer" }}
                      htmlFor={`uploadteamPhoto-${index}`}
                    >
                      {team.photo ? (
                        <MdAddAPhoto style={hideAddPhotoIcon(team, "photo")} />
                      ) : (
                        <MdAddAPhoto style={hideAddPhotoIcon(team, "imgUrl")} />
                      )}
                    </label>
                    <input
                      type="file"
                      id={`uploadteamPhoto-${index}`}
                      style={{ display: "none" }}
                      onChange={(event) => handlePhotoChange(event, index)}
                    />
                    {team.photo ? (
                      <div>
                        <img
                          src={URL.createObjectURL(team.photo)}
                          alt={`Team ${index} Photo`}
                          style={{
                            maxWidth: "100px",
                            maxHeight: "100px",
                          }}
                        />
                        <span
                          className={style.cancelImageUpload}
                          onClick={() => handleCancelImage(index, "photo")}
                        >
                          <img src={cross} alt="" />
                        </span>
                      </div>
                    ) : team.imgUrl ? (
                      <div>
                        <img
                          src={team.imgUrl}
                          alt={`Team ${index} Photo`}
                          style={{
                            maxWidth: "100px",
                            maxHeight: "100px",
                          }}
                        />
                        <span
                          className={style.cancelImageUpload}
                          onClick={() => handleCancelImage(index, "imgUrl")}
                        >
                          <img src={cross} alt="" />
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      value={team.name}
                      onChange={(event) =>
                        handleInputChange(event, index, "name")
                      }
                    />
                    <input
                      type="text"
                      placeholder="Designation"
                      value={team.designation}
                      onChange={(event) =>
                        handleInputChange(event, index, "designation")
                      }
                    />
                  </div>
                  {teamDetails.length > 1 && (
                    <span
                      style={{ cursor: "pointer" }}
                      className={style.cancelTeamDetailUpload}
                      onClick={() => handleCancelTeam(index)}
                    >
                      <img src={cross} alt="" />
                    </span>
                  )}
                </div>
              ))}
              <span
                className={style.addTeamDetailbtn}
                onClick={handleAddTeamDetail}
              >
                <MdOutlineAddBox /> &nbsp;<div>Add Person</div>
              </span>
            </div>
          </>
        ) : (
          <div className={style.addTeamDetailDynamicDiv}>
            {teamDetails.map((team, index) => (
              <div key={index} className={style.addTeamDetailMainDiv}>
                <div>
                  <label
                    style={{ cursor: "pointer" }}
                    htmlFor={`uploadteamPhoto-${index}`}
                  >
                    <MdAddAPhoto style={hideAddPhotoIcon(team, "photo")} />
                  </label>
                  <input
                    type="file"
                    // value={studioDetails?.teamDetails}
                    id={`uploadteamPhoto-${index}`}
                    style={{ display: "none" }}
                    onChange={(event) => handlePhotoChange(event, index)}
                  />
                  {team.photo && (
                    <div>
                      <img
                        src={URL.createObjectURL(team.photo)}
                        alt={`Team ${index} Photo`}
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                        }}
                      />
                      <span
                        className={style.cancelImageUpload}
                        onClick={() => handleCancelImage(index, "photo")}
                      >
                        <img src={cross} alt="" />
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={team.name}
                    onChange={(event) =>
                      handleInputChange(event, index, "name")
                    }
                  />
                  <input
                    type="text"
                    placeholder="Profile"
                    // value={team.profile}
                    onChange={(event) =>
                      handleInputChange(event, index, "profile")
                    }
                  />
                </div>
                {teamDetails.length > 1 && (
                  <span
                    style={{ cursor: "pointer" }}
                    className={style.cancelTeamDetailUpload}
                    onClick={() => handleCancelTeam(index)}
                  >
                    <img src={cross} alt="" />
                  </span>
                )}
              </div>
            ))}
            <span
              className={style.addTeamDetailbtn}
              onClick={handleAddTeamDetail}
            >
              <MdOutlineAddBox /> &nbsp;<div>Add Person</div>
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default AddMultipleTeam;