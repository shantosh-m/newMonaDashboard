const express = require("express");
const cors = require("cors");
const app = express();
const port = 3002;
app.use(express.json());
app.use(cors());

const connectToDatabase = require("./DataBaseConnection/dbConfig");
connectToDatabase();

const gettingMachineInfo = require("./APIs/getMachineInfo");
app.use("/", gettingMachineInfo);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
