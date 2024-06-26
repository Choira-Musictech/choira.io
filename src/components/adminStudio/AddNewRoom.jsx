import React, { useEffect, useRef, useState } from "react";
import { MdAddAPhoto, MdOutlineAddBox } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import upload from "../../assets/img/upload.png";
import style from "../../pages/admin/studios/studio.module.css";
import cross from "../../assets/cross.svg";

import {
  FaCheckDouble,
  FaFilter,
  FaRegBell,
  FaRegClock,
  FaShare,
} from "react-icons/fa6";

import StudioFooter from "./StudioFooter";
import { Button, Divider, Input, Select, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DragAndDropImageDiv from "../../pages/admin/layout/DragAndDropImageDiv";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

function AddNewRoom({
  setshowRoomsDetails,
  isEditMode,
  setrooms,
  rooms,
  indexofrooms,
  setIndexofrooms,
  showMode,
}) {
  const currentRoomsData = rooms[indexofrooms] || "";
  const format = "HH:mm";
  const customStyles = {
    height: "90%",
    overFlow: "scroll",
  };
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);
  const [time, setTime] = useState([]);
  const [generalTime, setGeneralTime] = useState(
    currentRoomsData.generalEndTime && currentRoomsData.generalStartTime
      ? {
          generalStartTime: currentRoomsData.generalStartTime,
          generalEndTime: currentRoomsData.generalEndTime,
        }
      : {
          generalStartTime: "00:00",
          generalEndTime: "00:00",
        }
  );
  const handleAddDetails = () => {
    setDetails((prevDetails) => [...prevDetails, ""]); // Add an empty string to the details array
  };
  // const [generalTime, setGeneralTime] = useState({
  //   generalEndTime: "",
  //   generalStartTime: ""

  // })
  // const [bookingTimes, setBookingTimes] = useState([
  //   { startTime: "00:00", endTime: "00:00" },

  // ]);

  const [bookingTimes, setBookingTimes] = useState(
    currentRoomsData?.availabilities
      ? [...currentRoomsData.availabilities]
      : [{ startTime: "00:00", endTime: "00:00" }]
  );

  // let genreralStartTime;
  // let genreralEndTime;

  const [details, setDetails] = useState(
    currentRoomsData.details ? currentRoomsData.details : [[]]
  );

  const inputRef = useRef(null);
  const [images, setImages] = useState(
    currentRoomsData ? currentRoomsData.roomPhotos : []
  );

  useEffect(() => {
    setrooms((prevRooms) => {
      return prevRooms.map((room, idx) => {
        if (idx === indexofrooms) {
          return {
            ...room, // Copy the previous room data
            roomPhotos: images, // Update roomPhotos with the new images
          };
        } else {
          return room;
        }
      });
    });
  }, [images]);

  useEffect(() => {
    setrooms((prevRooms) => {
      return prevRooms.map((room, idx) => {
        if (idx === indexofrooms) {
          return {
            ...room, // Copy the previous room data
            roomId: indexofrooms + 1,
          };
        } else {
          return room;
        }
      });
    });
  }, []);

  useEffect(() => {
    console.log("images", images);
  }, [images]);
  useEffect(() => {
    setrooms((prerooms) => {
      prerooms.map((rm, idex) => {
        if (idex === indexofrooms) {
          rm.amenities = selectedAmenities;
        }
      });
      return prerooms;
    });
  }, [selectedAmenities.length]);

  // useEffect(() => {
  //   setrooms((prerooms) => {
  //     prerooms.map((rm, idex) => {
  //       if (idex === indexofrooms) {
  //         console.log("selectedDate", selectedDate);
  //         rm.bookingDays = selectedDate;
  //       }
  //     });
  //     return prerooms;
  //   });
  // }, [selectedDate.length]);

  useEffect(() => {
    console.log("====>>>>>>>", rooms);
  }, [rooms]);

  useEffect(() => {
    setrooms((prerooms) => {
      return prerooms.map((rm, idex) => {
        if (idex === indexofrooms) {
          return { ...rm, availabilities: bookingTimes };
        }
        return rm;
      });
    });
  }, [bookingTimes]);

  useEffect(() => {
    setrooms((prerooms) => {
      return prerooms.map((room) => {
        return {
          ...room,
          generalStartTime: generalTime.generalStartTime,
          generalEndTime: generalTime.generalEndTime,
        };
      });
    });
  }, [generalTime]);

  const handelGeneralTime = (time, timeString) => {
    console.log(time, timeString);
    console.log("time is ", time);
    console.log("timeString is ", timeString);
    setGeneralTime({
      generalStartTime: timeString[0],
      generalEndTime: timeString[1],
    });
  };

  useEffect(() => {
    currentRoomsData.generalStartTime = generalTime.generalStartTime;
    currentRoomsData.generalEndTime = generalTime.generalEndTime;
  }, [generalTime]);

  useEffect(() => {
    // Ensure there's always at least one booking time range displayed
    if (bookingTimes.length === 0) {
      setBookingTimes([[{ startTime: "00:00", endTime: "00:00" }]]);
    }
  }, [bookingTimes]);

  const handleAddBookingTime = () => {
    // Add a new booking time range to the array
    setBookingTimes([
      ...bookingTimes,
      { startTime: "00:00", endTime: "00:00" },
    ]);
  };

  const handleCancelBooking = (index) => {
    // if (bookingTimes.length > 1 && index >= 0 && index < bookingTimes.length) {
    const newBookingTimes = [...bookingTimes];
    // alert(index);
    newBookingTimes.splice(index, 1);
    console.log(newBookingTimes);
    setBookingTimes(newBookingTimes);
    // }
  };

  useEffect(() => {
    console.log("bookingTimes", bookingTimes);
  }, [bookingTimes]);

  // const handelbookingTime = (time, timeString, index) => {
  //   console.log("timeString is", timeString);
  //   const updatedBookingTimes = [...bookingTimes];
  //   updatedBookingTimes[index] = timeString;
  //   setBookingTimes(updatedBookingTimes);
  // };
  const handelbookingTime = (time, timeString, index) => {
    console.log("timeString is", timeString);
    const updatedBookingTimes = [...bookingTimes];
    updatedBookingTimes[index] = {
      startTime: timeString[0],
      endTime: timeString[1],
    };
    setBookingTimes(updatedBookingTimes);
  };

  const abdefaultValue = ["18:30:56", "23:30:56"];

  useEffect(() => {
    console.log("timeRange", time);
  }, [time]);
  dayjs.extend(customParseFormat);

  const days = [
    // { id: "1", name: "Monday" },
    // { id: "2", name: "Tuesday" },
    // { id: "3", name: "wednesday" },
    // { id: "4", name: "thursday" },
    // { id: "5", name: "friday" },
    // { id: "6", name: "Saturday" },
    // { id: "7", name: "sunday" },
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const amenitiesList = [
    "Wifi",
    "AC",
    "DJ",
    "Piano",
    "Drum",
    "Car Parking",
    "Banjo",
  ];

  const filteredDates = days.filter((o) => !selectedDate.includes(o));

  const filteredAmenities = amenitiesList.filter(
    (o) => !selectedAmenities.includes(o)
  );

  useEffect(() => {
    setSelectedAmenities(
      currentRoomsData?.amenities?.map((item) => item) || []
    );
  }, [currentRoomsData?.amenities]);

  useEffect(() => {
    setSelectedDate(
      currentRoomsData?.bookingDays?.map((item) => item?.name || item) || []
    );
  }, [currentRoomsData?.bookingDays]);

  useEffect(() => {
    console.log("selectedDate updated:", selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    console.log("room k details mila", rooms);
  }, [rooms]);

  const handleRoomNameChange = (event) => {
    const { value } = event.target;
    setrooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      updatedRooms[indexofrooms] = {
        ...currentRoomsData,
        roomName: value,
      };
      return updatedRooms;
    });
  };

  const handleRoomAreaChange = (event) => {
    const { value } = event.target;
    setrooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      updatedRooms[indexofrooms] = {
        ...currentRoomsData,
        area: value,
      };
      return updatedRooms;
    });
  };

  const handlePricePerHourChange = (event) => {
    const { value } = event.target;
    setrooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      updatedRooms[indexofrooms] = {
        ...updatedRooms[indexofrooms],
        pricePerHour: parseFloat(value),
        basePrice: parseFloat(value), // Update basePrice as well
      };
      return updatedRooms;
    });
  };

  const handleDiscountChange = (event) => {
    const { value } = event.target;
    setrooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      updatedRooms[indexofrooms] = {
        ...currentRoomsData,
        discountPercentage: parseFloat(value),
      };
      return updatedRooms;
    });
  };
  const handleRoomDetailsChange = (e, index) => {
    const updatedDetails = [...details];
    updatedDetails[index] = e.target.value;
    setDetails(updatedDetails);
  };

  // useEffect(() => {
  //   setrooms((prevRooms) => ({
  //     ...prevRooms,
  //     details: details,
  //   }));
  // }, [details]);

  useEffect(() => {
    currentRoomsData.details = details;
  }, [details]);

  const handleCancelDetails = (index) => {
    let teampDetail = [...details];
    teampDetail.splice(index, 1);
    setDetails(teampDetail);
  };

  return (
    <>
      <div className={style.addNewStudioTitle}>Add new room</div>
      <div className={style.addNewRoomPage}>
        <div
          style={{
            position: showMode ? "relative" : "",
            overflow: "hidden",
          }}
        >
          {showMode ? <p className={style.showmode}></p> : ""}

          <div>
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="RoomName">Room Name</label>
              <input
                type="text"
                id="RoomName"
                placeholder="Enter Room Name"
                value={currentRoomsData?.roomName}
                onChange={handleRoomNameChange}
              />
            </div>

            <div className={style.addNewStudioinputBox}>
              <label htmlFor="RoomArea">Room Area</label>
              <input
                type="text"
                id="RoomArea"
                placeholder="Enter Approx. Area"
                value={currentRoomsData?.area}
                onChange={handleRoomAreaChange}
              />
            </div>
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="price">Price Per Hour</label>
              <input
                type="number"
                id="price"
                placeholder="Enter Price Per Hour"
                value={currentRoomsData?.pricePerHour}
                onChange={handlePricePerHourChange}
              />
            </div>
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="Discount">Discount</label>
              <input
                type="number"
                id="Discount"
                placeholder="Enter Discount"
                value={currentRoomsData?.discountPercentage}
                min={0}
                max={100}
                onChange={handleDiscountChange}
              />
            </div>
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="Dates">Booking Days </label>
              <Select
                id="Dates"
                mode="multiple"
                placeholder="Select Bookig Dates"
                value={selectedDate}
                onChange={setSelectedDate}
                // style={customStyles}
                options={filteredDates?.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </div>

            <div className={style.addNewStudioinputBox}>
              <label>General Start & End Time</label>

              <TimePicker.RangePicker
                format={format}
                onChange={handelGeneralTime}
                // defaultValue={[
                //   dayjs("1:30:00", "HH:mm:ss"),
                //   dayjs("2:30:56", "HH:mm:ss"),
                // ]}

                value={
                  currentRoomsData?.generalStartTime
                    ? [
                        dayjs(
                          `${currentRoomsData.generalStartTime}`,
                          `${format}`
                        ),
                        dayjs(
                          `${currentRoomsData.generalEndTime}`,
                          `${format}`
                        ),
                      ]
                    : [dayjs("00:00", `${format}`), dayjs("00:00", `${format}`)]
                }
                style={{ height: "100%", outline: "none" }}
              />
            </div>
          </div>
          <div
          //  style={{ overflow: "visible" }}
          >
            <DragAndDropImageDiv
              images={images}
              setImages={setImages}
              isEditMode={isEditMode}
            />
            <div className={style.addNewStudioinputBox}>
              <label htmlFor="roomAmenities">Amenities </label>

              <Select
                id="roomAmenities"
                mode="multiple"
                placeholder="Select Amenites"
                value={selectedAmenities}
                onChange={setSelectedAmenities}
                // style={customStyles}
                options={filteredAmenities?.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </div>

            {details.length === 0 ? (
              <div
                className={style.addNewStudioinputBox2}
                style={{ position: "relative" }}
              >
                <label htmlFor="RoomDetails">Room Details</label>
                <textarea
                  type="text"
                  id="RoomDetails"
                  placeholder="Enter Room Details"
                  value={""} // Empty value
                  onChange={(e) => handleRoomDetailsChange(e, 0)}
                />
                {details.length > 1 && (
                  <span
                    className={style.cancelDetailsUpload}
                    onClick={() => handleCancelDetails(0)}
                  >
                    <img src={cross} alt="" />
                  </span>
                )}
              </div>
            ) : (
              details.map((detail, index) => (
                <>
                  <div
                    className={style.addNewStudioinputBox2}
                    key={index}
                    style={{ position: "relative" }}
                  >
                    <label htmlFor="RoomDetails">Room Details</label>
                    <textarea
                      type="text"
                      id="RoomDetails"
                      placeholder="Enter Room Details"
                      value={detail}
                      onChange={(e) => handleRoomDetailsChange(e, index)}
                    />

                    {details.length > 1 && (
                      <span
                        className={style.cancelDetailsUpload}
                        onClick={() => handleCancelDetails(index)}
                      >
                        <img src={cross} alt="" />
                      </span>
                    )}
                  </div>
                </>
              ))
            )}
            {details.length < 3 && (
              <span
                className={style.addTeamDetailbtn}
                onClick={handleAddDetails}
              >
                <MdOutlineAddBox /> &nbsp;<div>Add Booking Time</div>
              </span>
            )}

            <label className={style.defaultLabel}>
              Booking start & End Time
            </label>
            {bookingTimes.map((bt, index) => (
              <>
                <div
                  key={index}
                  className={style.addNewStudioinputBox}
                  style={{
                    position: "relative",
                    maxHeight: "6vh",
                    minHeight: "6vh",
                  }}
                >
                  <TimePicker.RangePicker
                    format={format}
                    onChange={(time, timeString) =>
                      handelbookingTime(time, timeString, index)
                    }
                    value={
                      bt.startTime === ""
                        ? [dayjs("00:00", "HH:mm"), dayjs("00:00", "HH:mm")]
                        : [
                            dayjs(bt.startTime, "HH:mm"),
                            dayjs(bt.endTime, "HH:mm"),
                          ]
                    }
                    style={{
                      height: "100%",
                      outline: "none",
                      justifySelf: "flex-end",
                    }}
                  />
                  {bookingTimes.length > 1 && (
                    <span
                      className={style.cancelImageUpload}
                      onClick={() => handleCancelBooking(index)}
                    >
                      <img src={cross} alt="" />
                    </span>
                  )}
                </div>
              </>
            ))}
            <span
              className={style.addTeamDetailbtn}
              onClick={handleAddBookingTime}
            >
              <MdOutlineAddBox /> &nbsp;<div>Add Booking Time</div>
            </span>
          </div>
        </div>
      </div>
      <StudioFooter
        backOnclick={() => {
          setshowRoomsDetails(false);
        }}
      />
    </>
  );
}

export default AddNewRoom;
