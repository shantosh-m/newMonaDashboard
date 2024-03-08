// MachineContext.js
import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const MachineContext = createContext();

// const { io } = require("socket.io-client");

export const MachineProvider = ({ children }) => {
  const [machineData, setMachineData] = useState();

  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/gettingMachineInfo"
      );
      setMachineData(response.data);
      console.log("Backend API Response:", response.data);
    } catch (error) {
      console.error("Error fetching machine data:", error);
    }
  };

  // const setupSocketListener = () => {
  //   const socket = io(process.env.REACT_APP_SERVER_BASE_URL, {
  //     transports: ["websocket"],
  //   });
  //   socket.on("machineDataUpdate", (data) => {
  //     // Update the machineData state with real-time data from the socket
  //     setMachineData(data);
  //     console.log("Socket update:", data);
  //   });

  //   socket.on("machines", (data) => {
  //     console.log("Connected to socket");
  //     console.log("socket data ", data);
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("Disconnected from socket");
  //   });
  // };
  useEffect(() => {
    fetchDataFromBackend(); // Fetch initial data when the component mounts
  }, []);

  return (
    <MachineContext.Provider value={{ machineData }}>
      {children}
    </MachineContext.Provider>
  );
};

export const useMachineContext = () => {
  return useContext(MachineContext);
};
