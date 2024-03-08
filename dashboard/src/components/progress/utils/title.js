/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, Grid, Typography } from "@mui/material";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";

import PropTypes from "prop-types";

export const Title = (props) => {
  const { title, ...others } = props;
  return (
    <Grid
      item
      xs={12}
      sx={{ paddingBottom: 2, paddingLeft: 2, paddingRight: 2, margin: 0 }}
    >
      <Card
        sx={{
          backgroundColor: "#9FA5C2",
          paddingTop: 2,
          paddingLeft: 2,
          paddingBottom: 1,
        }}
      >
        <Typography variant="h5" component="div" color={"white"} align="center">
          {title}
        </Typography>
      </Card>
    </Grid>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};
