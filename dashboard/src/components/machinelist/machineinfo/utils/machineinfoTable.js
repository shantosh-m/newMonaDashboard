import * as React from "react";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { DataGrid } from "@mui/x-data-grid";

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const headCells = null;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Machine {props.machineId}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  machineId: PropTypes.number.isRequired,
};

var machineNewData = [];
var moldMake = ["ALEX", "TET", "TONY", "MONA"];
var moldMat = ["HIPS", "ABS", "ABS-CLEAR", "SAN"];
for (let index = 0; index < 60; index++) {
  machineNewData.push({ machineID: (index % 60).toString(), rows: [] });
}
const page = 2;
for (let index = 0; index < 60; index++) {
  machineNewData.forEach((value) => {
    if (value.machineID == page.toString()) {
      value.rows.push({
        _id: index,
        monaNumber: "#132" + index.toString(),
        moldSerial: "QXO43" + index.toString(),
        moldShots: 12 + index,
        failedShots: 2 + (index % 5),
        prodRate: 12 + index,
        material: moldMat[index % 4],
        moldMaker: moldMake[index % 4],
        startDate: "05/06/2017",
        endDate: "09/06/2017",
      });
    }
  });
}
// console.log(machineNewData);
export function MachineInfoTable() {
  const columns = useMemo(
    () => [
      {
        field: "monaNumber",
        flex: 15,
        headerName: "Mona Number",
      },
      {
        field: "moldSerial",
        flex: 15,
        headerName: "Mold Serial",
      },
      {
        field: "moldMaker",
        flex: 15,
        headerName: "Mold Maker",
      },
      {
        field: "material",
        flex: 15,

        headerName: "Mold Material",
      },
      {
        field: "prodRate",
        flex: 12,

        headerName: "Hour Rate",
      },
      {
        field: "moldShots",
        flex: 12,

        headerName: "Mold Shots",
      },
      {
        field: "startDate",
        flex: 12,

        headerName: "Start Date",
      },
      {
        field: "endDate",
        flex: 12,

        headerName: "End Date",
      },
      {
        field: "id",
        flex: 12,

        headerName: "ID",
      },
    ],
    []
  );
  var machineNewData = [];
  var moldMake = ["ALEX", "TET", "TONY", "MONA"];
  var moldMat = ["HIPS", "ABS", "ABS-CLEAR", "SAN"];

  for (let index = 0; index < 60; index++) {
    machineNewData.push({ machineID: (index % 60).toString(), rows: [] });
  }

  for (let index = 0; index < 60; index++) {
    machineNewData.forEach((value) => {
      if (value.machineID == page.toString()) {
        value.rows.push({
          monaNumber: "#132" + index.toString(),
          moldSerial: "QXO43" + index.toString(),
          moldShots: 12 + index,
          failedShots: 2 + (index % 5),
          prodRate: 12 + index,
          material: moldMat[index % 4],
          moldMaker: moldMake[index % 4],
          startDate: "05/06/2017",
          endDate: "09/06/2017",
          id: index,
        });
      }
    });
  }
  const rows = machineNewData[2].rows;

  return (
    <Box
      sx={{
        width: 1,
        height: "100%",
        marginLeft: "100px",
        marginRight: "20px",
      }}
    >
      <DataGrid
        autoHeight
        columns={columns}
        rows={rows}
        pageSize={10}
        rowsPerPageOptions={[12]}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />
      {console.log(columns)}
      <Paper sx={{ width: "100%", mb: 2 }}></Paper>
    </Box>
  );
}
