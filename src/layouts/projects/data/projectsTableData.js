/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

//React and BLACKBOX components
import axios from "axios";
// import { backendRequest, requestType } from "utils/requests";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";

function Completion({ value, color }) {
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
}

const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    star
  </Icon>
);

async function getProjects() {
  var config = {
    method: "get",
    url: "http://localhost:8080/researchProject",
    headers: {},
  };

  return await axios(config);
}

async function getFilteredProjects(hash) {
  const map = Object.fromEntries(hash);
  const jsonMap = JSON.stringify(map);
  var config = {
    method: "post",
    url: "http://localhost:8080/researchProject/filters",
    headers: {'Content-Type': 'application/json;charset=UTF-8'  },
    data: jsonMap.toString()
  };

  return await axios(config);
}

async function generateRows(hash) {
  
  let temp;
  if (typeof hash === 'undefined'){
    temp = await getProjects();
  } else {
    temp = await getFilteredProjects(hash)
  }
  let { data } = temp;
  let rowArray = [];
  for (let count = 0; count < data.length; count++) {
    let row;
    row = {
      id: data[count].id,
      proyecto: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          {data[count].title}
        </SoftTypography>
      ),
      estado: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          {data[count].rprojectStatus.status}
        </SoftTypography>
      ),
      "tipo de proyecto":(
        <SoftTypography variant="button" color="text" fontWeight="medium">
          {data[count].rprojectType.type}
        </SoftTypography>
      ),
      "tipo de financiación":(
        <SoftTypography variant="button" color="text" fontWeight="medium">
          {data[count].financingType.type}
        </SoftTypography>
      ),
      "fuente de financiación":(
        <SoftTypography variant="button" color="text" fontWeight="medium">
          {data[count].financingSource.source}
        </SoftTypography>
      ),
    };

    rowArray.push(row);
  }
  return rowArray;
}

const createTable = async (resolve, reject, hash) => {
  const columns = [
    { name: "proyecto", align: "left" },
    { name: "estado", align: "left" },
    { name: "tipo de proyecto", align: "center" },
    { name: "tipo de financiación", align: "center" },
    { name: "fuente de financiación", align: "center" },
  ];
  try {
    const rows = await generateRows(hash);
    const projectsTableData = { columns, rows };
    resolve(projectsTableData);
  } catch (e) {
    reject(e);
  }
};

export { createTable };
