/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";

// Images
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoWebDev from "assets/images/small-logos/logo-webdev.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";
import axios from "axios";
/* function Completion({ value, color }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {value}%&nbsp;
      </SoftTypography>
      <SoftBox width="8rem">
        <SoftProgress value={value} color={color} variant="gradient" label={false} />
      </SoftBox>
    </SoftBox>
  );
} */

/*const objData = [
  {
    objectivos: "lorem ipsum",
    entregables: "lertd vas itrfcg sa",
  },
  {
    objectivos: "lorem sdcat ydasa",
    entregables: "rewas cxaa itrfcg sa",
  },
  {
    objectivos: "renr qerds ipsum",
    entregables: "samo vas ertyuv sa",
  },
];*/


function Objective({ objective }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="secondary">
        {objective}
      </SoftTypography>
    </SoftBox>
  );
}

function Entregable({ entregable}) {
  return (
    <SoftBox display="flex" flexDirection="column" >
      <SoftTypography variant="caption" fontWeight="medium" color="secondary">
        {entregable}
      </SoftTypography>
    </SoftBox>
  );
}

async function getData(projectId) {
  var config = {
    method: "get",
    url: "http://localhost:8080/researchProject/objectives/"+projectId,
    headers: {},
  };
  return await axios(config)
}

async function GenerateObjectiveRows(projectId) {
  let {data} = await getData(projectId);
  console.log(data)
  return data.map((x) => {
    return {
      objetivos: <Objective objective={x.description}></Objective>,
      estado: <Entregable entregable={x.isFinished}></Entregable>,
    };
  });
}


const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);



const createObjectiveTable = async(resolve,error,projectId) => {
  console.log(projectId)
  const columns = [
    { name: "objetivos", align: "center" },
    { name: "estado", align: "center" },
  ];

  const rows = await GenerateObjectiveRows(projectId)
  const objectiveTableData = {columns,rows};
  resolve(objectiveTableData);
};


export {createObjectiveTable}