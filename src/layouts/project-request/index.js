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



// @mui material components
import Card from "@mui/material/Card";
import AppBar from "@mui/material/AppBar";
// import ProfileInfoCard from "examples/Cards/InfoCard/ProfileInfoCard";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import '../create-group/create-group.css'

function CreateRequest() {

  const location = useLocation();

  const { project } = location.state;

  const [descripction_admission_request, setDescripction] = useState("");

  const [axiosStatus, setAxiosStatus] = useState(false);
  const [showingAlert, setShowingAlert] = useState(false);
  // const [project, setProject] = useState(projectInfo);

  const submitForm = () => {

    var user = {
      id: 1,
      /* userType: {},
      username: "alexadrito",
      first_name: "Alex",
      last_name: "Samaca",
      dob: "2002-01-06T00:00:00.000+00:00",
      password: "elmico",
      email: "alexito@gmail.com",
      userPicture:[],
      admissionRequests: [],
      researchGroups: [],
      rgroupUsers:[],
      studentPrograms:[],
      resources:[],
      rRprojectUser:[] */
    }

    var requestInfo = {
      description: descripction_admission_request,
      user: user,
      researchProject: project
    }

    //var data = JSON.stringify(requestInfo);
    var data = requestInfo;
    console.log(data);

    var config = {
      method: "post",
      url: "http://localhost:8080/admissionrequest/add",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        setAxiosStatus(true);
      })
      .catch(function (error) {
        console.log(error);
        setAxiosStatus(false);
      });

    setDescripction("");

    setShowingAlert(true);

    setTimeout(() => {
      setShowingAlert(false);
    }, 2800);
  }

  return (
    <DashboardLayout>
      <AppBar className={`${showingAlert ? 'alert-shown' : 'alert-hidden'}`} position={"fixed"} sx={{ zIndex: 1300}}>
        < br/>
        <Card sx={{ marginLeft: '40%', width: '515px', boxShadow: 3}}>
          {axiosStatus ? (
            <SoftTypography variant="h4" p={2}>
              <p style={{ display: 'inline', color: '#82d616' }}>Correcto:</p>
              &nbsp;Postulación enviada exitosamente
            </SoftTypography>
          ) : (
            <SoftTypography variant="h4" p={2}>
              <p style={{ display: 'inline', color: '#ea0606' }}>Error:</p>
              &nbsp;No se pudo enviar tu postulación
            </SoftTypography>
          )}
        </Card>
      </AppBar>

      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h3">Postulación a proyecto</SoftTypography>
            </SoftBox>
            <SoftBox p={3}>
              <SoftTypography variant="body2" mb={1}>Tu postulación:</SoftTypography>
              <SoftInput name="descripction_admission_request" placeholder="Cuentanos por qué quieres ser parte del proyecto"
                multiline rows={3}
                value={descripction_admission_request}
                onChange={(e) => setDescripction(e.target.value)} />
              <SoftButton sx={{ marginTop: 3, height: 64, fontSize: 18 }}
                color="info"
                variant="gradient"
                size="large"
                fullWidth
                onClick={submitForm}
              >
                Enviar
              </SoftButton>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}


function submitForm() {
  // console.log(this.state)
  // Turn this.state into JSON object
  // console.log(JSON.stringify(this.state));

  var requestInfo = [...descripction_admission_request];

  console.log(requestInfo);

  // var data = JSON.stringify(this.state);

  // var config = {
  //   method: 'post',
  //   url: 'http://localhost:8080/admissionrequest/add',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   data: data
  // };

  // var objective_data = {
  //   descripction_admission_request: this.descripction_admission_request,
  //   user: this.user
  //   //project: this.project
  // }

  // // Clear input fields
  // this.setState({ ["descripction_admission_request"]: "" });

}

export default CreateRequest;