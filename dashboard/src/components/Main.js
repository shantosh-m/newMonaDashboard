/* eslint-disable no-unused-vars */
import { Box, Grid } from "@mui/material";
import { MachineList } from "./machinelist/index.js";
import { Progress } from "./progress/index.js";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

// import { MachineInfoPage } from "./machinelist/machineinfo/MachineinfoPage.js";
import NavBar from "./NavBar.js";
import SideBar from "./SideBar.js";
import NotFound from "../404.js";

export default function Dashboard(props) {
  // const [machineData, setMachineData] = useState([]);
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <SideBar open={open} setOpen={setOpen} />
      <CssBaseline />
      <Grid
        container
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          // backgroundColor: "red",
        }}
      >
        <Box sx={{ flex: 1, overflow: "auto", marginTop: "2%" }}>
          <Routes>
            <Route exact path="/machinelist" element={<MachineList />} />
            <Route exact path="/progress" element={<Progress />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Box>
      </Grid>
    </Box>
    // </DashboardLayout>
  );
}
