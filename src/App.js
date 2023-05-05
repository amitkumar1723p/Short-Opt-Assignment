import "./App.css";
import React, { useState, useRef } from "react";

function App() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState(null);
  const inputRef = useRef([]);

  const HandleInputChage = (e, index) => {
    // Set Single Value in otp_input

    if (isNaN(e.target.value) === false && e.target.value !== " ") {
      setErrorMessage(null);
      let newotp = [...otp];
      newotp[index] = e.target.value;

      setOtp(newotp);

      //  Set Focus in otp Input field
      if (otp[index].length == 0) {
        if (index < inputRef.current.length - 1) {
          inputRef.current[index].blur();
          inputRef.current[index + 1].focus();
        }
        if (index > otp.length - 2) {
          inputRef.current[index].blur();
        }
      } else {
        if (index >= 1) {
          inputRef.current[index].blur();
          inputRef.current[index - 1].focus();
        }
      }
    }
  };
  //   key Handler
  const keyHandler = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index >= 1) {
        inputRef.current[index].blur();
        inputRef.current[index - 1].focus();
      }
      setErrorMessage(null);
    }

    if (
      (e.key === "ArrowRight" && index < inputRef.current.length - 1) ||
      (e.keyCode == 32 && index < inputRef.current.length - 1)
    ) {
      inputRef.current[index].blur();
      inputRef.current[index + 1].focus();
      setErrorMessage(null);
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRef.current[index].blur();
      inputRef.current[index - 1].focus();
      setErrorMessage(null);
    }
  };
  //  Set Otp copy value in  otp input field
  const HandlePaste = (e) => {
    setErrorMessage(null);
    const clipboardValue = e.clipboardData.getData("Text");

    let newotp = [...otp];

    for (let i = 0; i < clipboardValue.length; i++) {
      if (i < newotp.length) {
        if (isNaN(clipboardValue[i]) == false && clipboardValue[i] !== " ") {
          newotp[i] = clipboardValue[i];
        }
      }
    }
    setOtp(newotp);
  };

  //  Submit Otp
  const SubmitOtp = () => {
    if (otp.indexOf("") != -1) {
      setErrorMessage("may be some otp field is Empty");
    } else {
      setOtp(["", "", "", "", "", ""]);
      setErrorMessage("Your otp is verify");
    }
  };
  return (
    <>
      <div className="otpverify_Container">
        <h1>Phone Verification</h1>
        <p>Please enter the 6-digit OTP sent to your phone number.</p>

        <div className="otpInput">
          {otp.map((item, index) => {
            return (
              <input
                type="text"
                id={index}
                value={item}
                key={index}
                maxLength="1"
                onChange={(e) => {
                  HandleInputChage(event, index);
                }}
                onKeyDown={(e) => {
                  keyHandler(e, index);
                }}
                ref={(ref) => {
                  return (inputRef.current[index] = ref);
                }}
                onPaste={HandlePaste}
              />
            );
          })}
        </div>
        {errorMessage && <p className="showerror">{errorMessage}</p>}
        <button onClick={SubmitOtp}> Verify</button>
      </div>
    </>
  );
}

export default App;
