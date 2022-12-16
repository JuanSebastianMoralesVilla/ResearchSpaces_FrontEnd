/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

//React and BLACKBOX components
import axios from "axios";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";
import groups from "layouts/groups/data/groups.json";

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

async function getGroups() {
  var config = {
    method: "get",
    url: "http://localhost:8080/researchgroup",
    headers: {},
  };

  return await axios(config);
}

async function getFilteredGroups(hash) {
  const map = Object.fromEntries(hash)
  const jsonMap = JSON.stringify(map)
  var config = {
    method: "post",
    url: "http://localhost:8080/researchGroups/filters",
    headers: {'Content-Type': 'application/json;charset=UTF-8'  },
    data: jsonMap.toString()
  };

  return await axios(config);
}

async function generateRows(hash) {
  let temp;
  if (typeof hash === 'undefined'){
    temp = await getGroups();
  } else {
    temp = await getFilteredGroups(hash)
  }
  let { data } = temp;
  let rowArray = [];

  for (let count = 0; count < data.length; count++) {
    let row;
    row = {
      id:data[count].id,
      grupo: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          {data[count].name}
        </SoftTypography>
      ),
      categoria: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          {data[count].mincienciasCategory.category}
        </SoftTypography>
      ),
      facultad: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          {data[count].faculty.name}
        </SoftTypography>
      ),
      institucion: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          {data[count].institution.name}
        </SoftTypography>
      ),
    };

    rowArray.push(row);
  }

  return rowArray;
}

// const projectsTableData = {
//   columns: [
//     { name: "grupo", align: "left" },
//     { name: "categoria", align: "left" },
//     { name: "facultad", align: "center" },
//     { name: "area de conocimiento", align: "center" },
//   ],

//   rows: [
//     {

//     };
// }

const createTable = async (resolve, reject, hash) => {
  const columns = [
    { name: "grupo", align: "left" },
    { name: "categoria", align: "left" },
    { name: "facultad", align: "center" },
    { name: "institucion", align: "center" },
  ];

  try {
    const rows = await generateRows(hash);
    const groupsTableData = { columns, rows };
    resolve(groupsTableData);
  } catch (e) {
    reject(e);
  }
};

export { createTable };
