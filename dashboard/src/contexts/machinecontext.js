// MachineContext.js
import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import socketIOClient from 'socket.io-client';

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
    
    socket.on('updated_protector_messages', (updatedMessages) => {
      if (updatedMessages.type == "run" )
      setMachineData(state => {
        return state.map(machine => {
          if (machine.moldProtector == updatedMessages.protector_id){
            console.log("thanujan", updatedMessages.data.success)
            if (updatedMessages.data.success == 1)
              return {...machine, moldShots : machine.moldShots + 1  }
            else (updatedMessages.data.success == 0)
              return {...machine, failedShots : machine.failedShots + 1  }
          }
          else 
            return machine
        })
      })

      else if (updatedMessages.type == "status" )
      setMachineData(state => {
        return state.map(machine => {
          if (machine.moldProtector == updatedMessages.protector_id){
            if(updatedMessages.data.status == "working" || updatedMessages.data.status == "stuck" || updatedMessages.data.status == "error" )
              return {...machine,  status : updatedMessages.data.status}
            else 
              return machine 
          }
          else 
            return machine
        })
      })

      


      console.log(updatedMessages, "thanujan")

     

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
