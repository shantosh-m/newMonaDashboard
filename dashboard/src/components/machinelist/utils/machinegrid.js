// import { Grid } from "@mui/material";
import "./tab.css";

export const MachineGrid = (props) => {
  const machineID = props.ID;
  const monaNumber = props.status === "notWorking" ? null : props.monaNumber;
  const status = props.status;
  const moldMaker = status === "notWorking" ? null : props.moldMaker;
  const moldShots = status === "notWorking" ? null : props.moldShots;
  const failedShots = status === "notWorking" ? null : props.failedShots;
  const moldMaterial = status === "notWorking" ? null : props.moldMaterial;
  const moldProtector = props.moldProtector;

  var working;
  var stuck;

  if (status === "working") {
    working = true;
    stuck = false;
  }
  if (status === "notWorking") {
    working = false;
    stuck = false;
  }
  if (status === "stuck") {
    stuck = true;
    working = false;
  }

  let machineBoxClassName = "machine_no_box";
  if (!working) {
    machineBoxClassName = stuck
      ? "machine_no_box_stuck"
      : "machine_no_box_notworking";
  }

  return (
    <div className="working_machine">
      <div className="tab_full_background">
        <div className="header-box">
          <span>{moldProtector}</span>
          <img src="././headerfill-vector.svg" alt="Header SVG" />
        </div>
        <div className={working || stuck ? "tab_body" : "tab_body_notworking1"}>
          <div className={machineBoxClassName}>{machineID}</div>
          {monaNumber && (
            <div className="mona_number">
              {Array.isArray(monaNumber) ? (
                monaNumber.map((number, index) => (
                  <div key={index}>{number}</div>
                ))
              ) : (
                <div>{monaNumber}</div>
              )}
            </div>
          )}
          <div
            className={
              working || stuck ? "mold_company" : "mold_company_notworking"
            }
          >
            {moldMaker}
          </div>
          <div
            className={
              working || stuck ? "mold_material" : "mold_material_notworking"
            }
          >
            {moldMaterial}
          </div>
          <div
            className={
              working || stuck ? "total_shots" : "total_shots_notworking"
            }
          >
            {moldShots}
          </div>
          <div
            className={
              working || stuck ? "failed_shots" : "failed_shots_notworking"
            }
          >
            {failedShots}
          </div>
        </div>
      </div>
    </div>
  );
};
