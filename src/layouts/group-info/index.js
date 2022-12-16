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
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";


// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";
import SoftButton from "components/SoftButton";

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

//import PlatformSettings from "layouts/project/components/PlatformSettings";

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

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Tables } from "layouts/tables/index";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

/* eslint-disable react/prop-types */
class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupInfo: {},
      groupLoaded: false,
    };
    this.fetchProject = this.fetchProject.bind(this);
    this.fetchProject();
  }

  async fetchProject() {
    var config = {
      method: "get",
      url: "http://localhost:8080/researchgroup/" + this.props.params.id,
      headers: {},
    };
    
    await axios(config)
      .then((response) => {
        this.setState({ ["groupInfo"]: response.data });
        this.setState({ ["groupLoaded"]: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const mystyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    };

    return (
      <DashboardLayout>
        <SoftBox mt={5} mb={3} ml={3}>
          {this.state.groupLoaded && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={11.7}>
                <div style={mystyle}>
                  <SoftTypography variant="h1">{this.state.groupInfo.name}</SoftTypography>{" "}
                  <>
                      {window.localStorage.getItem("role") === "teacher" && (
                      <SoftBox mt={5} mb={3} ml={3} mr={10}>
                        <SoftButton
                          variant="gradient"
                          color="success"
                          size="large"
                          component={Link}
                          to={"/metrics/" + this.props.params.id}
                        >
                          Metricas
                        </SoftButton>
                      </SoftBox>
                    )}
                  </>
                </div>

                {/*       <SoftTypography variant="body2" mt="15px">
                #Categoria de minciencias:  {this.state.groupInfo.mincienciasCategory.category}
              </SoftTypography> */}
                <SoftTypography variant="body2" mt="15px">
                  Categoria de minciencias: {this.state.groupInfo.mincienciasCategory.category}
                </SoftTypography>

                <SoftBox>
                  <SoftTypography variant="h4" mt="60px">
                    Descripción del grupo{" "}
                  </SoftTypography>
                  <SoftTypography variant="body2">
                    {this.state.groupInfo.description}
                  </SoftTypography>
                </SoftBox>
              </Grid>
              <Grid item xs={12} xl={11}>
                <SoftBox>
                  <List style={{ display: "flex", flexDirection: "row", padding: 0 }}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary="Facultad"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="inherit"
                              color="text.primary"
                            >
                              {" "}
                              {this.state.groupInfo.faculty.name}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>

                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary="Lider del Grupo"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="inherit"
                              color="text.primary"
                            >
                              {this.state.groupInfo.rgroupLeader[0].leaderSecondLastName}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        sx={{ height: "100%", width: "100%" }}
                        primary="Institución"
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
                              {this.state.groupInfo.institution.name}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </List>
                  
                </SoftBox>
              </Grid>
            </Grid>
          )}
        </SoftBox>

        <Footer />
      </DashboardLayout>
    );
  }
}

export default withParams(Overview);
