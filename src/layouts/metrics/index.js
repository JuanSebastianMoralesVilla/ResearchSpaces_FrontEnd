/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import * as React from "react";
import { Link } from "react-router-dom";
import { Chart } from 'react-google-charts';

import { useState, useEffect, useRef } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/project/components/Header";
//import PlatformSettings from "layouts/project/components/PlatformSettings";

import { Piechart } from "./components/piechart/Index";
import { ClipLoader } from "react-spinners";


// Data
import profilesListData from "layouts/project/data/profilesListData";
//import projectData from "layouts/project/data/projectData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import { useParams } from "react-router-dom";
import axios, { CancelToken } from "axios";
import { Tables } from "layouts/tables/index";
import Dashboard from "layouts/dashboard";
import { backendRequest } from "utils/requests";

function Metrics() {
  const [projectsTotal, setProjectsTotal] = useState();
  let projectsPlanning = 0;
  let projectsDesign = 0;
  let projectsExecution = 0;
  let projectsDiffusion = 0;
  const [requestsTotal, setRequestTotal] = useState();
  const [requestsAccepted, setRequestsAccepted] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [data, setData] = useState();
  const [groupName, setGroupName] = useState();
  const { id } = useParams();
  const [dataFetched, setDataFetched] = useState(false);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      //Carga de cada una de las metricas
      const groupTemp = await backendRequest("GET", "researchgroup/" + id);
      setGroupName(groupTemp.data.name);

      const totalTemp = await backendRequest("GET", "researchgroup/totalProjects/" + id);
      setProjectsTotal(totalTemp.data);

      const planningTemp = await backendRequest(
        "GET",
        "researchgroup/totalProjectsStatePlanning/" + id
      );
      projectsPlanning = planningTemp.data;

      const designTemp = await backendRequest(
        "GET",
        "researchgroup/totalProjectsStateDesign/" + id
      );
      projectsDesign = designTemp.data;

      const executionTemp = await backendRequest(
        "GET",
        "researchgroup/totalProjectsStateExecution/" + id
      );
      projectsExecution = executionTemp.data;

      const diffusionTemp = await backendRequest(
        "GET",
        "researchgroup/totalProjectsStateSubmission/" + id
      );
      projectsDiffusion = diffusionTemp.data;

      const totalRequestTemp = await backendRequest("GET", "researchgroup/total/" + id);
      setRequestTotal(totalRequestTemp.data);

      const acceptedTemp = await backendRequest("GET", "researchgroup/approved/" + id);
      setRequestsAccepted(acceptedTemp.data);

      loadPiechartValues();

    } catch (error) {
      console.log(error);
      var message = "Problemas internos, intentar más tarde.";
      setErrorMsg(message);
    }

    setLoading(false);
  };

  function loadPiechartValues() {
    const values = [
      ["Fase de proyecto", "Número de proyectos"],
      ["Planeación", projectsPlanning],
      ["Diseño", projectsDesign],
      ["Ejecución", projectsExecution],
      ["Difusión", projectsDiffusion],
    ];
    setData(values);
    setDataFetched(true);
  }

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <DashboardLayout>
      <Header />
      {loading ? (
        <SoftBox
          textAlign="center"
          width="calc(100%)"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          <ClipLoader color="black"></ClipLoader>
        </SoftBox>
      ) : errorMsg ? (
        <SoftBox mt={5} mb={3} ml={3}>
          <SoftTypography width="calc(100%)" alignItems="center" variant="h6">
            {errorMsg}
          </SoftTypography>
        </SoftBox>
      ) : (
        <SoftBox mt={5} mb={3} ml={3}>
          <SoftTypography variant="h1">Metricas - {groupName}</SoftTypography>
          <SoftBox mt={5} mb={3} ml={3}>
            <SoftTypography variant="h4">Total de proyectos</SoftTypography>
            <SoftTypography variant="body1">{projectsTotal}</SoftTypography>
          </SoftBox>
          <SoftBox mt={5} mb={3} ml={3}>
            {dataFetched && <Piechart data= { data } />}
          </SoftBox>
          <SoftBox mt={5} mb={3} ml={3}>
            <List style={{ display: "flex", flexDirection: "row", padding: 0 }}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={<SoftTypography variant="h4">Total de solicitudes</SoftTypography>}
                  secondary={
                    <React.Fragment>
                      <SoftTypography variant="body1">{requestsTotal}</SoftTypography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={<SoftTypography variant="h4">Solicitudes aceptadas</SoftTypography>}
                  secondary={
                    <React.Fragment>
                      <SoftTypography variant="body1">{requestsAccepted}</SoftTypography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </SoftBox>
        </SoftBox>
      )}
    </DashboardLayout>
  );
}

export default Metrics;
