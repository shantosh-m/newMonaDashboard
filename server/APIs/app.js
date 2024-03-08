const express = require("express");
const { createServer } = require("http"); // Import only createServer from "http"
const { Server } = require("socket.io"); // Import Server from "socket.io"
const cors = require("cors"); // Import CORS middleware
const Machine = require("../Models/machineModel");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// Store messages for each protector
const protectorMessages = {};

io.on("connection", (socket) => {
  console.log("Client connected!");

  socket.on("protector", (msg) => {
    console.log(
      `Message received from  ${msg.protector_id}: `
    );
    console.log(msg.data);
    console.log(msg.type);

   

    if (msg.type == "run" || msg.type == "status")
      io.emit("updated_protector_messages", msg);

    // write to database and all
    const updateToDB = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/updateOrInsert/${msg.protector_id}/:${msg.success}`
        );
        // Log the data received from the backend API
        console.log("API Response:", response.data);
      } catch (error) {
        console.error("Error fetching machine data:", error);
      }
    };

    updateToDB();
  });
});

// Function to update or insert into MongoDB
async function updateOrInsert(machineID, success) {
  try {
    const existingDocument = await Machine.findOne({ machineID });

    if (existingDocument) {
      if (success) {
        await Machine.updateOne({ machineID }, { $inc: { moldShots: 1 } });
        console.log(`Updated moldShots for machine ${machineID}`);
      } else {
        await Machine.updateOne({ machineID }, { $inc: { failedShots: 1 } });
        console.log(`Updated failedShots for machine ${machineID}`);
      }
    } else {
      if (success) {
        await Machine.create({ machineID, moldShots: 1 });
        console.log(`With moldShot = 1 machine ${machineID} created`);
      } else {
        await Machine.create({ machineID, failedShots: 1 });
        console.log(`With failedShot = 1 machine ${machineID} created`);
      }
    }
  } catch (error) {
    console.error("Error updating or inserting:", error);
  }
}

// API endpoint to handle the update or insert
app.put("/updateOrInsert/:machineID/:success", async (req, res) => {
  const machineID = parseInt(req.params.machineID);
  const success = parseInt(req.params.success);
  console.log(machineID);
  if (!isNaN(machineID) && machineID > 0) {
    if (!isNaN(success) && (success == 0 || success == 1)) {
      await updateOrInsert(machineID, success);
      res.send(`Updated or inserted for machine ${machineID}`);
    } else {
      res.status(400).send("Invalid success code");
    }
  } else {
    res.status(400).send("Invalid machine number");
  }
});

// Serve the dashboard HTML
// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/dashboard.html");
// });

httpServer.listen(3001, () => {
  console.log("Server started on port 3001");
});
