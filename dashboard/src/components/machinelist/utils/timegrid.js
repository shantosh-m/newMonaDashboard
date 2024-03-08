import React, { useState, useEffect } from "react";
import ".//Clock.css";
import dayImage from "./day_night_image/day_image.png"; // Adjust the file extension and path as needed
import nightImage from "./day_night_image/night_image.png"; //

function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [dayNightImage, setDayNightImage] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const currentHour = currentDateTime.getHours();
    const isDayTime = currentHour >= 6 && currentHour < 18;

    if (isDayTime) {
      setDayNightImage(dayImage);
    } else {
      setDayNightImage(nightImage);
    }
  }, [currentDateTime]);

  const formattedTime = currentDateTime.toLocaleTimeString();
  const formattedDate = currentDateTime.toLocaleDateString();
  const formattedDayOfWeek = currentDateTime.toLocaleDateString(undefined, {
    weekday: "long",
  });

  return (
    <div
      className="working_machine"
      style={{
        backgroundColor: "white",
        borderColor: "white",
        boxShadow: null,
      }}
    >
      <div
        className="tab_full_background"
        style={{
          backgroundColor: "white",
          borderColor: "white",
          boxShadow: null,
        }}
      >
        <div
          className="header-box"
          style={{
            backgroundColor: "white",
            borderColor: "white",
            boxShadow: null,
          }}
        >
          {/* <span>{moldProtector}</span> */}
          {/* {formattedTime} {formattedDate} {formattedDayOfWeek} */}
          {/* <img src="././headerfill-vector.svg" alt="Header SVG" /> */}
        </div>
        <div
          className="tab_body"
          style={{
            backgroundColor: "white",
            borderColor: "white",
            boxShadow: null,
          }}
        >
          <div className="live-time-date-box">
            <img
              className="day-night-image"
              src={dayNightImage}
              alt="Day or Night Image"
            />
            <div className="time">{formattedTime}</div>
            <div className="date">{formattedDate}</div>
            <div className="day">{formattedDayOfWeek}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
