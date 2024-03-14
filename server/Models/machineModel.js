const mongoose = require("mongoose");

// Define a schema for your collection
const machineSchema = new mongoose.Schema({
  machineID: Number,
  failedShots: Number,
  moldMaker: String,
  moldMaterial: String,
  moldProtector: String,
  moldShots: Number,
  monaNumber: String,
  status: String,
});

// Create a model using the schema
const Machine = mongoose.model("machines", machineSchema);

// Export the Mold model
module.exports = Machine;
