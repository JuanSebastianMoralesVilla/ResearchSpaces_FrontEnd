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

import { useState, useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import AppBar from "@mui/material/AppBar";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Icon from '@mui/material/Icon';

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";

// Soft UI Dashboard React examples
import TimelineList from "examples/Timeline/TimelineList";
import TimelineItem from "examples/Timeline/TimelineItem";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/project/components/Header";
//import PlatformSettings from "layouts/project/components/PlatformSettings";

// Data
import profilesListData from "layouts/project/data/profilesListData";
//import projectData from "layouts/project/data/projectData";

import { useParams } from "react-router-dom";
import axios from "axios";
import {Tables} from "layouts/tables/index"
import '../create-group/create-group.css'

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

/* eslint-disable react/prop-types */
class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectInfo: {},
      projectLoaded: false,
      timeLineInfo:{},
      timeLineLoaded:false,
      showResourceForm: false,
      resourceInfo: {
        description: '',
        resourceUrl: ''
      },
      axiosStatus: false,
      showingAlert: false
    };

    this.fetchProject = this.fetchProject.bind(this);
    this.openResourceForm = this.openResourceForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addResource = this.addResource.bind(this);

    this.fetchProject();
    this.fetchProjectTimeLine();

  }

  async fetchProject() {
    var config = {
      method: "get",
      url: "http://localhost:8080/researchProject/" + this.props.params.id_research_project,
      headers: {},
    };

    await axios(config)
      .then((response) => {
        this.setState({ ["projectInfo"]: response.data })
        this.setState({ ["projectLoaded"]: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async fetchProjectTimeLine() {
    var config = {
      method: "get",
      url: "http://localhost:8080/researchProject/" + this.props.params.id_research_project+"/timeline",
      headers: {},
    };

    await axios(config)
      .then((response) => {
        this.setState({ ["timeLineInfo"]: response.data })
        this.setState({ ["timeLineLoaded"]: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }




  openResourceForm() {
    this.setState({ ["showResourceForm"]: !this.state.showResourceForm });
    this.setState({ ["missingData"]: false });
  }

  checkFields(props) {
    this.setState({ ["missingData"]: false });
    var fieldsOk = true;

    for (var prop in props) {
      if(props[prop] === "" || props[prop].length === 0) {
        console.log("Missing data");
        this.setState({ ["missingData"]: true });

        this.setState({ ["axiosStatus"]: false });
        this.setState({ ["showingAlert"]: true });

        setTimeout(() => {
          this.setState({
            ["showingAlert"]: false
          });
        }, 2800);

        fieldsOk = false;
        
        break;
      }
    }

    return fieldsOk;
  }

  async addResource() {
    // Validate fields not empty
    if (!this.checkFields(this.state.resourceInfo)) {
      return;
    }

    var resource = { ...this.state.resourceInfo }

    resource.publishDate = new Date();

    var data = [resource];

    data = JSON.stringify(data);

    console.log(data);

    var config = {
      method: "post",
      url: "http://localhost:8080/researchProject/addResources/" + this.props.params.id_research_project,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    await axios(config)
      .then((response) => {
        console.log("resource added successfully")
        if (response.status === 200 || response.status === 201) {
          this.setState({ ["axiosStatus"]: true });
        } else {
          this.setState({ ["axiosStatus"]: false });
        }
      })
      .catch(function (error) {
        console.log(error);
        this.setState({ ["axiosStatus"]: false });
      });

    this.setState({ ["showingAlert"]: true });

    setTimeout(() => {
      this.setState({
        ["showingAlert"]: false
      });
    }, 2800);

    this.setState({ ["showResourceForm"]: false });
    this.setState({ ["resourceInfo"]: {
      description: '',
      resourceUrl: ''
    } });
  }

  handleInputChange(event) {
    const target = event.target;

    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let resourceInfo = { ...this.state.resourceInfo }

    if (name === 'resourceInfo_description') {
      resourceInfo.description = value;
      this.setState({ ["resourceInfo"]: resourceInfo });
    } else if (name === 'resourceInfo_resourceUrl') {
      resourceInfo.resourceUrl = value;
      this.setState({ ["resourceInfo"]: resourceInfo });
    }
  }
  
  render() {
    const mystyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    };
    return (
      <DashboardLayout>
        <AppBar className={`${this.state.showingAlert ? 'alert-shown' : 'alert-hidden'}`} position={"fixed"} sx={{ zIndex: 1300}}>
          < br/>
          <Card sx={{ marginLeft: '40%', width: '520px', boxShadow: 3}}>
            {this.state.axiosStatus ? (
              <SoftTypography variant="h4" p={2}>
                <p style={{ display: 'inline', color: '#82d616' }}>Correcto:</p>
                &nbsp;El recurso se agregó exitosamente
              </SoftTypography>
            ) : (
              <SoftTypography variant="h4" p={2}>
                <p style={{ display: 'inline', color: '#ea0606' }}>Error:</p>
                &nbsp;No se ha podido agregar el recurso
              </SoftTypography>
            )}
          </Card>
        </AppBar>
        <Header/>
        <SoftBox mt={5} mb={3} ml={3}>
          {this.state.projectLoaded && <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={11.7}>
              <div style={mystyle}>
                <SoftTypography variant="h1">
                  <>{this.state.projectInfo.title}</>
                </SoftTypography>
                <SoftButton component={Link}
                  // to={{ pathname: "/project-request", state: { fromDashboard: true } }}
                  to="/project-request" state={{ project: this.state.projectInfo }}
                  variant="gradient" color="primary" size="large"> Postularme
                </SoftButton>
              </div>

              <SoftButton sx={{ marginTop: 3}}
                color={!this.state.showResourceForm ? "info" : "error"}
                variant="gradient"
                size="medium"
                onClick={this.openResourceForm}
              >
                {!this.state.showResourceForm ? (<>  
                  Agregar entregable
                  <Icon sx={{marginLeft: 1}}>add</Icon>
                </>) : (<>
                  Cancelar
                  <Icon sx={{marginLeft: 1}}>close</Icon>
                </>)}
              </SoftButton>
              {this.state.showResourceForm && <SoftBox mt={3}>
                <Card>
                  <SoftBox pt={3} pl={3} pr={3}>
                    <SoftTypography variant="h4">Agregar recurso</SoftTypography>
                  </SoftBox>
                  <SoftBox p={3}>
                    <SoftTypography variant="body2" mb={1}>Descripción:</SoftTypography>
                    <SoftInput name="resourceInfo_description" placeholder="Descripción"
                      value={this.state.resourceInfo.description}
                      onChange={this.handleInputChange} />
                    {this.state.missingData && !this.state.resourceInfo.description &&
                    <div style={{display: 'flex'}}>
                      <Icon color="error" sx={{marginTop: 0.3, marginLeft: 0.3}}>warning</Icon>
                      <SoftTypography variant="body2" color="error" mb={1}>&nbsp;Por favor llenar este campo</SoftTypography>
                    </div>}

                    <SoftTypography variant="body2" mt={3} mb={1}>URL del recurso:</SoftTypography>
                    <SoftInput name="resourceInfo_resourceUrl" placeholder="URL del recurso"
                      value={this.state.resourceInfo.resourceUrl}
                      onChange={this.handleInputChange} />
                    {this.state.missingData && !this.state.resourceInfo.resourceUrl &&
                    <div style={{display: 'flex'}}>
                      <Icon color="error" sx={{marginTop: 0.3, marginLeft: 0.3}}>warning</Icon>
                      <SoftTypography variant="body2" color="error" mb={1}>&nbsp;Por favor llenar este campo</SoftTypography>
                    </div>}

                    <SoftButton sx={{ marginTop: 3}}
                      color="info"
                      variant="gradient"
                      fullWidth
                      onClick={this.addResource}
                    >
                      Agregar
                    </SoftButton>
                  </SoftBox>
                </Card>
              </SoftBox>}

              <SoftBox>
                <SoftTypography variant="h4" mt={4}>Tipo de proyecto</SoftTypography>
                <SoftTypography variant="body2"><>{this.state.projectInfo.rprojectType.type}</></SoftTypography>
                <SoftTypography variant="h4" mt={3}>Descripción del proyecto</SoftTypography>
                <SoftTypography variant="body2"><>{this.state.projectInfo.description}</></SoftTypography>
                <SoftTypography variant="h4" mt={3}>Fecha de inicio del proyecto</SoftTypography>
                <SoftTypography variant="body2"><>{this.state.projectInfo.startDate.substring(0, 10)}</></SoftTypography>
                {this.state.projectInfo.finishDate && <>
                  <SoftTypography variant="h4" mt={3}>Fecha de finalización del proyecto</SoftTypography>
                  <SoftTypography variant="body2"><>{this.state.projectInfo.finishDate}</></SoftTypography>
                </>}
              </SoftBox>
            </Grid>

            <Grid item xs={12} xl={11}>
              <SoftBox>
                <List style={{ display: "flex", flexDirection: "row", padding: 0 }} sx={{marginBottom: 2}}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Estatus del proyecto"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="inherit"
                            color="text.primary"
                          >
                            {this.state.projectInfo.rprojectStatus.status}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>

                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Fuente de financiación"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="inherit"
                            color="text.primary"
                          >
                           {this.state.projectInfo.financingSource.source}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>

                  <ListItem alignItems="flex-start">
                      <ListItemText
                        sx={{ height: "100%", width: "100%" }}
                        primary="Tipo de financiación"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "1",
                                WebkitBoxOrient: "vertical",
                              }}
                              component="span"
                              variant="inherit"
                              color="text.primary"
                            >
                              {this.state.projectInfo.financingType.type}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                  </ListItem>
                </List>
                {this.state.timeLineLoaded && <TimelineList title="Linea de tiempo del proyecto"> 
                  {this.state.timeLineInfo.map((deliverable,index) => (
                      <TimelineItem 
                      key= {index}
                      color="info"
                      icon="work_outline"
                      title={deliverable.title.includes("http") ? "Nuevo recurso: " + deliverable.title : deliverable.title}
                      dateTime= {deliverable.deliverableDate.substring(0, 10)}
                      description= {deliverable.description}
                      badges={[deliverable.deliverableState]}
                      lastItem = { index === (this.state.timeLineInfo.length-1) ? true : false }
                      />
                    ))
                  }
                  </TimelineList>
                }
                
                <Tables projectId={this.state.projectInfo.id}></Tables>
              </SoftBox>
            </Grid>
          </Grid>
          }       
        </SoftBox>        
        <Footer />
      </DashboardLayout>
    );
  }
}

export default withParams(Overview);
