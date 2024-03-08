// import { Grid } from "@mui/material";

// export const  = () => {
//   return <div className="working_machine">hi</div>;
// };

import React, { useState, useEffect } from "react";
import "./progressgrid11.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export const options = {
  responsive: true,

  scales: {
    x: {
      title: {
        display: false,
      },
      labels: ["", "", "", "", ""], // Add empty strings as labels
      grid: {
        display: false, // Hide x-axis grid lines
      },
      ticks: {
        display: false,
        maxTicksLimit: 5, // Limit the number of ticks to the number of labels
        fontsize: 0,
      },
    },
    y: {
      title: {
        display: false,
      },
      grid: {
        display: false, // Hide x-axis grid lines
      },
      ticks: {
        display: false, // Hide x-axis ticks (values)
        min: 0,
      },
    },
  },
};

const MAX_POINTS = 5; // Maximum number of points to display

const initialData = {
  labels: Array.from({ length: 5 }),
  datasets: [
    {
      data: [],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      fill: true,
    },
  ],
};

export const ProgressGrid = () => {
  const [data, setData] = useState(initialData);
  const [lastHourRate, setLastHourRate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a new random production value
      // const randomValue = Math.floor(Math.random() * 25) + 10;

      // Update the data state with the new value
      setData((prevData) => {
        const newData = [...prevData.datasets[0].data, lastHourRate];

        // Ensure the data points are limited to MAX_POINTS
        const slicedData = newData.slice(-MAX_POINTS);

        return {
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: slicedData,
            },
          ],
        };
      });
    }, 6000); // Update every second

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [lastHourRate]);

  const [filled, setFilled] = useState(0);
  const [isRunning] = useState(true); // Start the progress bar when the component mounts

  const targetValue = Math.floor(Math.random() * (90 - 50 + 1)) + 30; // Generates a random number between 50 and 80

  useEffect(() => {
    if (filled < targetValue && isRunning) {
      setTimeout(() => setFilled((prev) => prev + 2), 50);
    }
  }, [filled, isRunning]);

  const progressPercent = filled + "%";

  const last_hour_rate = Math.floor(Math.random() * (100 - 60 + 1)) + 60; // Example range: 100 to 60
  useEffect(() => {
    setLastHourRate(last_hour_rate);
  }, [last_hour_rate]);

  const [target_shot] = useState(() => {
    // Example range: 10000 to 30000
    return Math.floor(Math.random() * (30000 - 10000 + 1)) + 10000;
  });
  const finished_shot = Math.round((filled / 100) * target_shot);

  return (
    <div className="working_machine1">
      <div className="tab_full_background">
        <div className="header-box">
          <span>MoldID</span>
          <img src="./headerfill-vector.svg" alt="Header SVG" />
        </div>
        <div className="tab_bodyprogress">
          <div className="graph_last_hour">
            <div className="graph_margin">
              <Line options={options} data={data}>
                <canvas style={{ height: "100%" }}></canvas>
              </Line>
            </div>
            <div className="last_hour_box">
              <div className="last_hour_rate">
                <span>{last_hour_rate}</span>
                <div className="tooltip">HOURLY RATE</div>
              </div>
            </div>
          </div>

          <div className="progressbar_margin">
            <div className="target">
              <span>
                {finished_shot} {">>"} {target_shot}
              </span>
            </div>
            <div className="progressbar">
              <div
                style={{
                  height: "100%",
                  width: progressPercent,
                  backgroundColor: "#3E8BFF",
                  transition: "width 0.5s",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
