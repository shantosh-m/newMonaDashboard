/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Container, Grid, Card, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
// import { MachineInfo } from "../machineinfo";
import { MachineInfoTable } from "../utils/machineinfoTable";
// import moment from "moment";
// import PropTypes from "prop-types";
import { Title } from "../../title.js";

export const MachineInfoPage = ({ machineData }) => {
  const {
    failedShots,
    machineID,
    material,
    moldID,
    moldMaker,
    moldShots,
    monaNumber,
    prodRate,
    prod_end_date,
    prod_start_date,
    status,
  } = machineData[0];
  console.log(machineID);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formattedTime = currentDateTime.toLocaleTimeString();
  const formattedDate = currentDateTime.toLocaleDateString();
  const formattedDayOfWeek = currentDateTime.toLocaleDateString(undefined, {
    weekday: "long",
  });

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        paddingTop: 3,
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
          sx={{ alignItems: "center", justifyContents: "center" }}
        >
          <React.Fragment>
            <Title title="Molding Info Page" />

            {/* <MachineInfo
              machineId={machineID}
              monaNumber={monaNumber}
              status={status}
              moldShots={moldShots}
              failedShots={failedShots}
              prodRate={prodRate}
              prod_startDate={prod_start_date}
              prod_endDate={prod_end_date}
            /> */}
            <Grid
              container
              sx={{ alignItems: "center", justifyContents: "center" }}
            >
              <MachineInfoTable
                machineId={machineID}
                monaNumber={monaNumber}
                status={status}
                moldShots={moldShots}
                failedShots={failedShots}
                prodRate={prodRate}
                prod_startDate={prod_start_date}
                prod_endDate={prod_end_date}
              />
            </Grid>
          </React.Fragment>
        </Grid>
      </Container>
    </Box>
  );
};
