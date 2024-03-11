const express = require("express");
const { createServer } = require("http"); // Import only createServer from "http"
const { Server } = require("socket.io"); // Import Server from "socket.io"
const cors = require("cors"); // Import CORS middleware

const connectToDatabase = require("../DataBaseConnection/dbConfig");
connectToDatabase();
const app = express();
const port = 3002;
app.use(express.json());
app.use(cors());
const gettingMachineInfo = require("./getMachineInfo");
app.use("/", gettingMachineInfo);

const Machine = require("../Models/machineModel");

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
    console.log(`Message received from  ${msg.protector_id}: `);
    console.log(msg.data);
    console.log(msg.type);
    // console.log(`Message received from ${msg.protector_id} ${msg.type}`);

    // if msg.type == "init":
    //     # check the database whether it has the same data.

    // Define a schema for your collection
    // const machineSchema = new mongoose.Schema({
    //     _id: String,
    //     machineID: Number,
    //     moldMaker: "String",
    //     moldMaterial: String,
    //     moldProtector: String,
    //     monaNumber: String,
    //   })

    // console.log(
    //   `Failed shots received from Protector ${msg.protector_id}: ${msg.failed_shots}`
    // );

    // Store the message for the protector
    // if (!protectorMessages[msg.protector_id]) {
    //   protectorMessages[msg.protector_id] = ;
    // }
    // protectorMessages[msg.protector_id].push({
    //   total_shots: msg.total_shots,
    //   failed_shots: msg.failed_shots,
    // });

    // Emit the updated messages to all clients

    if (msg.type === "run") {
      io.emit("updated_protector_messages", msg);
      update_insert_valid(msg.protector_id, msg.data.success);
    } else if (msg.type === "status") {
      io.emit("updated_protector_messages", msg);
      machineStatusChanging(msg.protector_id, msg.data.status);
    } else if (msg.type === "init") {
    } else {
      console.error("There is error occured");
    }
  });
});

// Function to update or insert into MongoDB
async function updateOrInsert(moldProtector, success) {
  try {
    const existingDocument = await Machine.findOne({ moldProtector });

    if (existingDocument) {
      if (success) {
        await Machine.updateOne({ moldProtector }, { $inc: { moldShots: 1 } });
        console.log(`Updated moldShots for machine ${moldProtector}`);
      } else {
        await Machine.updateOne(
          { moldProtector },
          { $inc: { failedShots: 1 } }
        );
        console.log(`Updated failedShots for machine ${moldProtector}`);
      }
    } else {
      if (success) {
        await Machine.create({ moldProtector, moldShots: 1 });
        console.log(`With moldShot = 1 machine ${moldProtector} created`);
      } else {
        await Machine.create({ moldProtector, failedShots: 1 });
        console.log(`With failedShot = 1 machine ${moldProtector} created`);
      }
    }
  } catch (error) {
    console.error("Error updating or inserting:", error);
  }
}

async function update_insert_valid(moldProtector, success) {
  console.log(moldProtector, success);
  if (!isNaN(success) && (success == 0 || success == 1)) {
    await updateOrInsert(moldProtector, success);
  } else {
    console.log("Invalid success code");
  }
}

async function machineStatusChanging(moldProtector, machineDataStatus) {
  try {
    const existingDocument = await Machine.findOne({ moldProtector });

    if (existingDocument) {
      await Machine.updateOne({ moldProtector }, { status: machineDataStatus });
      console.log(
        `Machine status changing for ${moldProtector} to  ${machineDataStatus}`
      );
    }
  } catch (error) {
    console.error("Error on changing status:", error);
  }
}

httpServer.listen(3001, () => {
  console.log("Server started on port 3001");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
