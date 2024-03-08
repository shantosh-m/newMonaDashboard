import React from "react";
// import React from "react";
// import { Box, Container, Grid } from "@mui/material";
// import { Link } from "react-router-dom";
import TimeGrid from "./utils/timegrid";
import { ProgressGrid } from "./utils/progressgrid";
// import moment from "moment";
import { Title } from "./utils/title";
//import { useMachineContext } from "../../contexts/machinecontext";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";

export const Progress = () => {
  // const { machineData } = useMachineContext();

  const moldids = [
    "M#123",
    "M#124",
    "M#125",
    "M#126",
    "M#127",
    "M#128_1",
    "M#129",
    "M#130",
    "M#131_1",
    "M#132",
    "M#133_2",
    "M#134",
    "M#135",
    "M#133_3",
    "M#137",
    "M#138",
    "M#128_2",
    "M#140",
    "M#141",
    "M#142",
    "M#143",
    "M#144",
    "M#145",
    "M#142_1",
  ];
  if (moldids) {
    return (
      <Container maxWidth={false}>
        <Title title="Production Rate" />

        <Grid
          container
          spacing={4}
          // columnSpacing={{ xs: 1, sm: 5, md: 3 }}
          sx={{
            // display: "flex",
            display: "flex",
            alignItems: "center",
            justifyContents: "center",
            // backgroundColor: "rgba(0,0,255)",
          }}
        >
          {moldids.map((machine, index) => {
            // if (machine.prodRate!= 0)
            if (index != 0) {
              return (
                <Grid
                  item
                  xs={11}
                  sm={4}
                  md={2}
                  lg={2}
                  m={{ sm: 2, md: 4, lg: 0 }}
                  key={index}
                  sx={{
                    alignItems: "center", // Center vertically
                    justifyContent: "center", // Center horizontally
                    // marginBottom: 2,
                    // display: "flex",
                    // backgroundColor: "rgba(0,255,255)",
                  }}
                >
                  <ProgressGrid />
                </Grid>
              );
            } else {
              return (
                <Grid
                  item
                  xs={11}
                  sm={4}
                  md={2}
                  lg={2}
                  m={{ sm: 2, md: 4, lg: 0 }}
                  // sx={{ backgroundColor: "black" }}
                >
                  <TimeGrid />
                </Grid>
              );
            }
          })}

          {/* Add the TimeGrid component as the last tab */}
        </Grid>
      </Container>
    );
  } else {
    return <div>connection not found</div>;
  }
};
