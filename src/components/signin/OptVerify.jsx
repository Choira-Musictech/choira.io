import React, { useState, useEffect, useRef } from "react";
import style from "../../pages/home/signinBackup.module.css";
import { useNavigate } from "react-router-dom";
import { Alert } from "antd";
import Swal from "sweetalert2";

const OptVerify = ({
  mobileNumber,
  countryCode,
  setCheckOtp,
  checkOtp,
  setRedicrectToDetail,
  redicrectToDetail,
  setSignup_checkOtp,
  signup_checkOtp,
  setDeletepopup,
  deletecheckOtp,
  setDeleteCheckOtp,
  setDeleteAccount,
  apiOtp,
}) => {
  const [seconds, setSeconds] = useState(30);
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [enteredOTP, setEnteredOTP] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const gotoBooking = () => {
    navigate("/adminDashboard");
  };
  const [isSignin, setIsSignin] = useState(false);

  useEffect(() => {
    // Generate a random OTP when the component mounts
    generateOTP();

    // Start the timer
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Set focus to the next input when enteredOTP changes
    if (enteredOTP.length < inputRefs.current.length) {
      inputRefs.current[enteredOTP.length].focus();
    }
  }, [enteredOTP]);

  const generateOTP = () => {
    const otp = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    console.log(` ingnore this otp ${otp}`);
    // alert("your otp is " + otp);
    alert("your otp is " + apiOtp);
    setGeneratedOTP(otp);
  };

  const restartTimer = () => {
    // Reset the timer to its initial value and generate a new OTP
    setSeconds(30);
    generateOTP();
  };

  const handleOTPChange = (index, value) => {
    // Handle OTP input change
    const newEnteredOTP = enteredOTP.split("");
    newEnteredOTP[index] = value;
    setEnteredOTP(newEnteredOTP.join(""));
  };

  const handleBackspace = (index) => {
    // Handle Backspace key
    if (index > 0) {
      const newEnteredOTP = enteredOTP.split("");
      newEnteredOTP[index - 1] = "";
      setEnteredOTP(newEnteredOTP.join(""));
      inputRefs.current[index - 1].focus();
    } else if (index === 0) {
      setEnteredOTP("");
    }
  };
  // this is for signin page
  useEffect(() => {
    if (checkOtp === false) {
      // if (enteredOTP === generatedOTP) {
      if (enteredOTP === apiOtp) {
        console.log("OTP is correct. Redirect or perform another action.");
        Swal.fire({
          title: "OTP is Correct!",
          text: "Welcome back 😊 ",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        gotoBooking();
        setCheckOtp(false);
        localStorage.setItem("isSignin", "true");
      } else {
        console.log("Incorrect OTP. Please try again.");
        alert("Incorrect OTP. Please try again.");
        <Alert
          message="Incorrect OTP. Please try again. "
          type="error"
          showIcon
          closable
        />;
        setCheckOtp(true);
      }
    }
  }, [checkOtp]);
  // this is for DeleteAccount page
  useEffect(() => {
    if (deletecheckOtp === false) {
      if (enteredOTP === generatedOTP) {
        console.log("OTP is correct. Redirect or perform another action.");
        alert("OTP is correct.");
        // setDeletepopup(true);

        setDeleteCheckOtp(false);
        setDeleteAccount(3);
      } else {
        console.log("Incorrect OTP. Please try again.");
        alert("Incorrect OTP. Please try again.");
        setDeleteCheckOtp(true);
      }
    }
  }, [deletecheckOtp]);

  //This part is for signup page
  useEffect(() => {
    if (signup_checkOtp === false) {
      if (enteredOTP === generatedOTP) {
        // If OTP is correct, you can perform an action here
        console.log("OTP is correct. Redirect or perform another action.");
        alert("OTP is correct.");
        setSignup_checkOtp(false);
        setRedicrectToDetail(true);
      } else {
        // If OTP is incorrect, you can handle it (e.g., show an error message)
        console.log("Incorrect OTP. Please try again.");
        alert("Incorrect OTP. Please try again.");
        setSignup_checkOtp(true);
      }
    }
  }, [signup_checkOtp]);

  return (
    <>
      <div className={style.enterMobinnerdiv2}>
        <div className={style.verify2}>
          <h4>Verify your mobile number</h4>
        </div>
        <div>
          <h6>
            Please enter the 4-digit verification code sent to
            <b>
              +{countryCode} {mobileNumber}
            </b>
          </h6>
        </div>
        <div className={style.verify2Input}>
          {[...Array(4)].map((_, index) => (
            <input
              required
              key={index}
              type="text"
              maxLength="1"
              pattern="\d*"
              value={enteredOTP[index] || ""}
              onChange={(e) => handleOTPChange(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  e.preventDefault();
                  handleBackspace(index);
                }
              }}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
        <div className={style.timer}>
          {seconds > 0 ? (
            <h6>
              Expect code in <b> {seconds} seconds</b>
            </h6>
          ) : (
            <h6 onClick={restartTimer}>
              <span>Resend</span>
            </h6>
          )}
        </div>
        {/* <Alert message="Success Tip" type="success" showIcon closable /> */}
      </div>
    </>
  );
};

export default OptVerify;
