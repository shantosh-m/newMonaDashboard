// import React, { useState, useEffect } from "react";
import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { MachineGrid } from "./utils/machinegrid";
import TimeGrid from "./utils/timegrid";

import { Title } from "./utils/title";

import { useMachineContext } from "../../contexts/machinecontext";

export const MachineList = () => {
  const { machineData } = useMachineContext();
  console.log(machineData, " machineData");

  if (machineData != null)
    return (
      <Container maxWidth={false}>
        <Title title="Molding Section Statistics" />

        <Grid
          container
          spacing={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid style={{ marginTop: "33px" }}>
            <TimeGrid />
          </Grid>

          {machineData.map((machine, index) => (
            <Grid
              item
              xs={11}
              sm={4}
              md={2}
              lg={2}
              m={{ sm: 2, md: 4, lg: 0 }}
              key={index}
              sx={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                to={{ pathname: `machines/:${machine.machineID}` }}
                state={{ ...machine }}
                style={{ textDecoration: "none" }}
              >
                <MachineGrid
                  ID={machine.machineID}
                  monaNumber={machine.monaNumber}
                  moldProtector={machine.moldProtector}
                  status={machine.status}
                  moldMaker={machine.moldMaker}
                  moldMaterial={machine.moldMaterial}
                  moldShots={Math.round(machine.moldShots)}
                  failedShots={Math.round(machine.failedShots)}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  else return <div>error</div>;
};
