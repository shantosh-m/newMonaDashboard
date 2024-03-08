// import makeStyles from "@mui/styles/"
import { makeStyles } from "@mui/styles";
// import ModeCommentIcon from "@mui/icons-material/PrecisionManufacturing";
// import Brightness1Icon from "@mui/icons-material/Brightness1";
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
const useStyles = makeStyles({
  root: {
    // position: "relative",
    // display: "inline-flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
  icon: {
    fontSize: "2.5em",
  },
  count: {
    // position: "absolute",
    // lineHeight: 0,
    // color: "#000",
    // top: "0.4em",
    // left: "0.1em",
    // fontSize: "3em",
    // fontWeight: "bolder",
    // backgroundColor: "rgba(0, 0, 255)",
  },
});

export function MachineWithNumber({ size = 18, count = 0 }) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ fontSize: size }}>
      {/* <Brightness1Icon
        fontSize="large"
        color="secondary"
        className={classes.icon}
      /> */}
      <Typography component="span" className={classes.count}>
        {count}
      </Typography>
    </div>
  );
}
