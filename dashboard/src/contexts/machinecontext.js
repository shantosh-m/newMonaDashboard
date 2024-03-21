import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";

const MachineContext = createContext();

const { io } = require("socket.io-client");

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

  //   useEffect(() => {

  //     return () => {
  //         socket.disconnect();
  //     };
  // }, []);

  const setupSocketListener = () => {
    const socket = io("http://localhost:3001");
    
    socket.on("updated_protector_messages", (updatedMessages) => {
      console.log(updatedMessages.type, "type");
      console.log(updatedMessages.protector_id, "Protector");
      if (updatedMessages.type === "init") {
        setMachineData((state) => {
            const existingMachine = state.find(machine => machine.moldProtector === updatedMessages.protector_id);
            if (existingMachine) {
                return state.map((machine) => {
                    if (machine.moldProtector === updatedMessages.protector_id) {
                        if (machine.moldMaterial !== updatedMessages.data.moldMaterial ||
                            machine.moldMaker !== updatedMessages.data.moldMaker ||
                            machine.monaNumber !== updatedMessages.data.monaNumber) {
                            return { ...machine, moldMaterial: updatedMessages.data.moldMaterial, moldMaker: updatedMessages.data.moldMaker, monaNumber: updatedMessages.data.monaNumber, status: "working",
                            moldShots: 0,
                            failedShots: 0 };
                        } else {
                            return machine;
                        }
                    } else {
                        return machine;
                    }
                });
            } else {
                const newMachine = {
                    moldProtector: updatedMessages.protector_id,
                    machineID: updatedMessages.data.machineID,
                    moldMaterial: updatedMessages.data.moldMaterial,
                    moldMaker: updatedMessages.data.moldMaker,
                    monaNumber: updatedMessages.data.monaNumber,
                    status: "working",
                    moldShots: 0,
                    failedShots: 0
                };
                return [...state, newMachine];
            }
        });
    }
      else if (updatedMessages.type == "run")
        setMachineData((state) => {
          return state.map((machine) => {
            if (machine.moldProtector == updatedMessages.protector_id) {
              console.log("success or fail", updatedMessages.data.success);
              if (updatedMessages.data.success == 1)
                return { ...machine, moldShots: machine.moldShots + 1 };
              else updatedMessages.data.success == 0;
              return { ...machine, failedShots: machine.failedShots + 1 };
            } else return machine;
          });
        });
      else if (updatedMessages.type == "status")
        setMachineData((state) => {
          return state.map((machine) => {
            if (machine.moldProtector == updatedMessages.protector_id) {
              if (
                updatedMessages.data.status == "working" ||
                updatedMessages.data.status == "stuck" ||
                updatedMessages.data.status == "error" ||
                updatedMessages.data.status == "notWorking"
              )
                return { ...machine, status: updatedMessages.data.status };
              else return machine;
            } else return machine;
          });
        });
      
      console.log(updatedMessages.type, "type");
      console.log(updatedMessages, "up-msg");
      console.log(updatedMessages.data, "status");

      // setProtectorMessages(updatedMessages);
      // Object.entries(updatedMessages).forEach(([protectorId, messages]) => {
      //     messages.forEach(message => {
      //         console.log(`Message received from Protector ${protectorId}: total_shots: ${message.total_shots}, failed_shots: ${message.failed_shots}`);
      //     });

      // });
    });
  };

  useEffect(() => {
    fetchDataFromBackend(); // Fetch initial data when the component mounts
    setupSocketListener();
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
