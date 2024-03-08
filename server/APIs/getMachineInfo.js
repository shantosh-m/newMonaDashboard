const express = require("express");
const router = express.Router();
const Machine = require("../Models/machineModel");

router.get("/gettingMachineInfo", async (req, res) => {
  try {
    const allMachines = await Machine.find();
    res.json(allMachines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
