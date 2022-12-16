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
import Icon from '@mui/material/Icon';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

import React from 'react';
import axios from 'axios';
import AppBar from "@mui/material/AppBar";
import './create-group.css'
import Select from 'react-select';

import { ThemeProvider, createTheme } from '@mui/material/styles';

class CreateGroup extends React.Component {

  multiSelectRef = null;

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      institutions: [],
      institution: "",
      faculties: [],
      faculty: "",
      research_lines: [],
      researchLines: [],
      mciencias_id: "",
      minciencias_categories: [],
      mincienciasCategory: "",
      description: "",
      leaderSecondLastName: "",
      leaderCitizenId: "",
      leaderNationality: "",
      leaderCountryOfBirth: "",
      missingData: false,
      axiosStatus: false,
      showingAlert: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);

    this.submitForm = this.submitForm.bind(this);
    this.checkFields = this.checkFields.bind(this);

    this.getInstitutions = this.getInstitutions.bind(this);
    this.getFaculties = this.getFaculties.bind(this);
    this.getResearchLines = this.getResearchLines.bind(this);
    this.getMincienciasCategories = this.getMincienciasCategories.bind(this);

    this.getInstitutions();
    this.getFaculties();
    this.getResearchLines();
    this.getMincienciasCategories();
  }

  getInstitutions() {
    var config = {
      method: 'get',
      url: 'http://localhost:8080/institution',
      headers: {},
    };

    axios(config)
      .then(response => {
        // console.log(response.data);
        this.setState({ ["institutions"]: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getFaculties() {
    var config = {
      method: 'get',
      url: 'http://localhost:8080/faculty',
      headers: {},
    };

    axios(config)
      .then(response => {
        // console.log(response.data);
        this.setState({ ["faculties"]: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getResearchLines() {
    var config = {
      method: 'get',
      url: 'http://localhost:8080/researchline',
      headers: {},
    };

    axios(config)
      .then(response => {
        // console.log(response.data);
        this.setState({ ["research_lines"]: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getMincienciasCategories() {
    var config = {
      method: 'get',
      url: 'http://localhost:8080/mincienciascategory',
      headers: {},
    };

    axios(config)
      .then(response => {
        // console.log(response.data);
        this.setState({ ["minciencias_categories"]: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  checkFields(props) {
    this.setState({ ["missingData"]: false });
    var fieldsOk = true;

    for (var prop in props) {
      if(props[prop] === "" || props[prop].length === 0) {
        if (prop === "researchLines") {
          continue;
        }
        
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

  async submitForm() {
    // console.log(this.state)
    // console.log(JSON.stringify(this.state));

    // copy of this.state
    let state = { ...this.state };

    // remove unnecessary fields
    delete state.institutions;
    delete state.faculties;
    delete state.research_lines;
    delete state.minciencias_categories;
    delete state.research_lines;
    delete state.missingData;
    delete state.axiosStatus;
    delete state.showingAlert;
    delete state.multiSelectRef;

    // Validate fields not empty
    if (!this.checkFields(state)) {
      return;
    }

    // Turn state copy into JSON object
    var data = JSON.stringify(state);

    // console.log("data: " + data);

    var config = {
      method: "post",
      url: "http://localhost:8080/researchgroup/create",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    // Clear input fields
    this.setState({ ["name"]: "" });
    this.setState({ ["institution"]: "" });
    this.setState({ ["faculty"]: "" });
    this.setState({ ["researchLines"]: [] });
    this.setState({ ["mciencias_id"]: "" });
    this.setState({ ["mincienciasCategory"]: "" });
    this.setState({ ["description"]: "" });
    this.setState({ ["leaderSecondLastName"]: "" });
    this.setState({ ["leaderCitizenId"]: "" });
    this.setState({ ["leaderNationality"]: "" });
    this.setState({ ["leaderCountryOfBirth"]: "" });
    this.multiSelectRef.clearValue();

    var group;

    await axios(config)
      .then(response => {
        var responseStatus = response.status;
        // console.log(responseStatus)
        if (responseStatus === 200 || responseStatus === 201) {
          group = response.data;
          this.setState({ ["axiosStatus"]: true });
        } else {
          this.setState({ ["axiosStatus"]: false });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ ["axiosStatus"]: false });
      });

    // console.log(JSON.stringify(group));

    let leaderInfo = { ...state, researchGroup: group };

    delete leaderInfo.name;
    delete leaderInfo.institution;
    delete leaderInfo.faculty;
    delete leaderInfo.researchLines;
    delete leaderInfo.mciencias_id;
    delete leaderInfo.mincienciasCategory;
    delete leaderInfo.description;

    leaderInfo.id = {
      "rgroupId": null,
      "leaderId": leaderInfo.leaderCitizenId
    }

    // console.log("leaderInfo: " + JSON.stringify(leaderInfo));

    var config = {
      method: 'post',
      url: 'http://localhost:8080/groupLeader/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: leaderInfo
    };

    axios(config)
      .then(response => {
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({ ["showingAlert"]: true });

    setTimeout(() => {
      this.setState({
        ["showingAlert"]: false
      });
    }, 2800);
  }

  handleInputChange(event) {
    if (!event.target) {
      // Select fields
      if (event.name === "institution") {
        this.setState({
          institution: this.state.institutions[event.value]
        })
      } else if (event.name === "faculty") {
        this.setState({
          faculty: this.state.faculties[event.value]
        })
      } else if (event.length > 0) {
        // Multi-select
        var researchLines = [];
        for (var i=0; i < event.length; i++) {
          researchLines.push(this.state.research_lines[event[i].value])
        }
        this.setState({
          researchLines: researchLines
        })
      } else if (event.name === "mincienciasCategory") {
        this.setState({
          mincienciasCategory: this.state.minciencias_categories[event.value]
        })
      }
    } else {
      const target = event.target;

      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }
  }

  render() {
    const customStyles = {
      control: (baseStyles) => ({
        ...baseStyles,
        height: 40,
        fontSize: '0.95rem',
      }),
      input: (baseStyles) => ({
        ...baseStyles,
        height: 32.5,
      }),
      valueContainer: (baseStyles) => ({
        ...baseStyles,
        height: 40,
      }),
      placeholder: (baseStyles) => ({
        ...baseStyles,
        color: '#b0bec5',
        fontSize: '0.95rem',
        fontWeight: '300',
      })
    }

    const theme = createTheme({
      components: {
        // Name of the component
        MuiAccordion: {
          styleOverrides: {
            // Name of the slot
            root: {
              backgroundColor: "#FFFFFF"
            },
          },
        },
      },
    });

    return (
      <DashboardLayout>
        <AppBar className={`${this.state.showingAlert ? 'alert-shown' : 'alert-hidden'}`} position={"fixed"} sx={{ zIndex: 1300}}>
          < br/>
          <Card sx={{ marginLeft: '40%', width: '500px', boxShadow: 3}}>
            {this.state.axiosStatus ? (
              <SoftTypography variant="h4" p={2}>
                <p style={{ display: 'inline', color: '#82d616' }}>Correcto:</p>
                &nbsp;El grupo se creó exitosamente
              </SoftTypography>
            ) : (
              <SoftTypography variant="h4" p={2}>
                <p style={{ display: 'inline', color: '#ea0606' }}>Error:</p>
                &nbsp;No se ha podido crear el grupo
              </SoftTypography>
            )}
          </Card>
        </AppBar>
        
        <DashboardNavbar />
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Card>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h3">Crear nuevo grupo</SoftTypography>
              </SoftBox>

              <SoftBox p={3}>
                <SoftTypography variant="body2" mb={1}>Nombre:</SoftTypography>
                <SoftInput name="name" placeholder="Nombre"
                  value={this.state.name}
                  onChange={this.handleInputChange} />
                {this.state.missingData && !this.state.name &&
                <div style={{display: 'flex'}}>
                  <Icon color="error" sx={{marginTop: 0.3, marginLeft: 0.3}}>warning</Icon>
                  <SoftTypography variant="body2" color="error" mb={1}>&nbsp;Por favor llenar este campo</SoftTypography>
                </div>}

                <SoftTypography variant="body2" mt={3} mb={1}>Institución:</SoftTypography>
                <Select name="institution" onChange={this.handleInputChange}
                styles={customStyles}
                value={ this.state.institution === "" ? "" : {label: this.state.institution.name, value: this.state.institution} }
                placeholder="Institución"
                options={this.state.institutions.map((inst, index) => ({
                  value: index,
                  label: inst.name,
                  name: "institution"
                }))} />
                {this.state.missingData && !this.state.institution &&
                <div style={{display: 'flex'}}>
                  <Icon color="error" sx={{marginTop: 0.3, marginLeft: 0.3}}>warning</Icon>
                  <SoftTypography variant="body2" color="error" mb={1}>&nbsp;Por favor llenar este campo</SoftTypography>
                </div>}

                <SoftTypography variant="body2" mt={3} mb={1}>Facultad:</SoftTypography>
                <Select name="faculty" onChange={this.handleInputChange}
                styles={customStyles}
                value={ this.state.faculty === "" ? "" : {label: this.state.faculty.name, value: this.state.faculty} }
                placeholder="Facultad"
                options={this.state.faculties.map((fclty, index) => ({
                  value: index,
                  label: fclty.name,
                  name: "faculty"
                }))} />
                {this.state.missingData && !this.state.faculty &&
                <div style={{display: 'flex'}}>
                  <Icon color="error" sx={{marginTop: 0.3, marginLeft: 0.3}}>warning</Icon>
                  <SoftTypography variant="body2" color="error" mb={1}>&nbsp;Por favor llenar este campo</SoftTypography>
                </div>}

                <SoftTypography variant="body2" mt={3} mb={1}>Línea(s) de investigación:</SoftTypography>
                <Select name="researchLines" onChange={this.handleInputChange}
                isMulti
                ref={ref => {
                  this.multiSelectRef = ref;
                }}
                styles={customStyles}
                placeholder="Línea(s) de investigación"
                options={this.state.research_lines.map((rline, index) => ({
                  value: index,
                  label: rline.name,
                  name: "researchLines"
                }))} />

                <SoftTypography variant="body2" mt={3} mb={1}>MinCiencias id:</SoftTypography>
                <SoftInput name="mciencias_id" placeholder="MinCiencias id"
                  value={this.state.mciencias_id}
                  onChange={this.handleInputChange} />

                <SoftTypography variant="body2" mt={3} mb={1}>Categoria MinCiencias:</SoftTypography>
                <Select name="mincienciasCategory" onChange={this.handleInputChange}
                styles={customStyles}
                value={ this.state.mincienciasCategory === "" ? "" : {label: this.state.mincienciasCategory.category, value: this.state.mincienciasCategory} }
                placeholder="Categoria MinCiencias"
                options={this.state.minciencias_categories.map((mcCat, index) => ({
                  value: index,
                  label: mcCat.category,
                  name: "mincienciasCategory"
                }))} />
                {this.state.missingData && !this.state.mincienciasCategory &&
                <div style={{display: 'flex'}}>
                  <Icon color="error" sx={{marginTop: 0.3, marginLeft: 0.3}}>warning</Icon>
                  <SoftTypography variant="body2" color="error" mb={1}>&nbsp;Por favor llenar este campo</SoftTypography>
                </div>}

                <SoftTypography variant="body2" mt={3} mb={1}>Descripción:</SoftTypography>
                <SoftInput name="description" placeholder="Descripción" multiline rows={3}
                  value={this.state.description}
                  onChange={this.handleInputChange} />
                {this.state.missingData && !this.state.description &&
                <div style={{display: 'flex'}}>
                  <Icon color="error" sx={{marginTop: 0.3, marginLeft: 0.3}}>warning</Icon>
                  <SoftTypography variant="body2" color="error" mb={1}>&nbsp;Por favor llenar este campo</SoftTypography>
                </div>}

                {/* <hr style={{ marginTop: 35 }} /> */}
                
                <Accordion sx={{'&:before': {display: 'none'}, marginTop: 4, marginBottom: 1, borderRadius: 2,
                  border: '1px solid #dddddd', borderBottom:'none !important'}} disableGutters>

                  <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
                    <SoftTypography variant="body1">Lider del grupo</SoftTypography>
                  </AccordionSummary>

                  <AccordionDetails sx={{marginBottom: 1}}>
                    <SoftTypography variant="body2" mt={3} mb={1}>Segundo apellido:</SoftTypography>
                    <SoftInput name="leaderSecondLastName" placeholder="Segundo apellido"
                      value={this.state.leaderSecondLastName}
                      onChange={this.handleInputChange} />

                    <SoftTypography variant="body2" mt={3} mb={1}>Cédula:</SoftTypography>
                    <SoftInput name="leaderCitizenId" placeholder="Cédula"
                      value={this.state.leaderCitizenId}
                      onChange={this.handleInputChange} />

                    <SoftTypography variant="body2" mt={3} mb={1}>Nacionalidad:</SoftTypography>
                    <SoftInput name="leaderNationality" placeholder="Nacionalidad"
                      value={this.state.leaderNationality}
                      onChange={this.handleInputChange} />

                    <SoftTypography variant="body2" mt={3} mb={1}>Ciudad de residencia:</SoftTypography>
                    <SoftInput name="leaderCountryOfBirth" placeholder="Ciudad de residencia"
                      value={this.state.leaderCountryOfBirth}
                      onChange={this.handleInputChange} />
                  </AccordionDetails>

                </Accordion>

                <SoftBox></SoftBox>

                {/* <SoftTypography variant="body2" mt={3} mb={1}>Segundo apellido del lider:</SoftTypography>
                <SoftInput name="leaderSecondLastName" placeholder="Segundo apellido del lider"
                  value={this.state.leaderSecondLastName}
                  onChange={this.handleInputChange} />

                <SoftTypography variant="body2" mt={3} mb={1}>Cédula:</SoftTypography>
                <SoftInput name="leaderCitizenId" placeholder="Cédula"
                  value={this.state.leaderCitizenId}
                  onChange={this.handleInputChange} />

                <SoftTypography variant="body2" mt={3} mb={1}>Nacionalidad:</SoftTypography>
                <SoftInput name="leaderNationality" placeholder="Nacionalidad"
                  value={this.state.leaderNationality}
                  onChange={this.handleInputChange} />

                <SoftTypography variant="body2" mt={3} mb={1}>Ciudad de residencia:</SoftTypography>
                <SoftInput name="leaderCountryOfBirth" placeholder="Ciudad de residencia"
                  value={this.state.leaderCountryOfBirth}
                  onChange={this.handleInputChange} /> */}

                <SoftButton sx={{ marginTop: 3, height: 64, fontSize: 18 }}
                  color="info"
                  variant="gradient"
                  size="large"
                  fullWidth
                  onClick={this.submitForm}
                >
                  Crear
                </SoftButton>
              </SoftBox>
            </Card>
          </SoftBox>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    );
  }
}

export default CreateGroup;
