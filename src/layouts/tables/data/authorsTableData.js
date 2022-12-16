/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import SoftButton from "components/SoftButton";
import Icon from "@mui/material/Icon";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { useEffect, useState } from "react";
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import avatar from "assets/images/avatar.png";
import axios from "axios";


const membersData = [
  {
    id: 1,
    name: "Carlos Bacilo",
    image: team2,
    role: "Administrador",
    email: "morales@vert.ce",
    status: "ACTIVO",
  },
  {
    id: 2,
    name: "Felipe",
    image: null,
    role: "Profesor",
    email: "aqytt@vert.ce",
    status: "INACTIVO",
  },
  {
    id: 3,
    name: "Marcela",
    image: team3,
    role: "Estudiante",
    email: "zweer@vert.ce",
    status: "ACTIVO",
  },
];

async function dummyUsers() {
  return membersData;
}

function Member({ image, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image ? image : avatar} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="bold">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function MemberRole({ role }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="" color="text">
        {role}
      </SoftTypography>
    </SoftBox>
  );
}

function MemberEdit({projectId,resolve,error}) {
  return (
    <SoftButton
      variant="text"
      color="error"
      onClick={handleChange(projectId,resolve,error)}
    >
      <ChangeCircleIcon>Change</ChangeCircleIcon>&nbsp;Eliminar
    </SoftButton>
  );
}

function Status({ status }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="bold" color="text">
        {status}
      </SoftTypography>
    </SoftBox>
  );
}

async function handleChange(id,resolve,error) {
  var config = {
    method: "delete",
    url: "http://localhost:8080/researchProject/delete/"+id,
    headers: {},
  };
  await axios(config).then((response)=>{
    if(response.status === 200){
      createMembersTable(resolve,error,id)
    }
  })
}

async function getUsers(projectId) {
  var config = {
    method: "get",
    url: "http://localhost:8080/researchProject/listUsers/"+projectId,
    headers: {},
  };

  return await axios(config)
}
async function GenerateMemberRows(projectId,resolve,error) {
  let {data} = await getUsers(projectId);
  console.log(projectId)
  let dummies = await dummyUsers();
  console.log(data)
  return data.map((x) => {
    return {
      integrante: <Member image={x.image} name={x.user.firstname} email={x.user.lastName}></Member>,
      funcion: <MemberRole role={x.memberRole}></MemberRole>,
      editar: <MemberEdit projectId={x.user.id} resolve={resolve} error={error} ></MemberEdit>
    };
  });
}

/* function Author({ image, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Function({ job, org }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography>
    </SoftBox>
  );
} */

 const createMembersTable = async(resolve,error,projectId) => {
  console.log(projectId)
  const columns = [
    { name: "integrante", align: "left" },
    { name: "funcion", align: "left" },
    { name: "editar", align: "center" },
  ];

  const rows = await GenerateMemberRows(projectId,resolve,error)
  const usersTableData = {columns,rows};
  resolve(usersTableData);
};

export {createMembersTable}
