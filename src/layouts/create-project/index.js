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
import Icon from '@mui/material/Icon';
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
import './create-project.css'
import Select from 'react-select';


class CreateProject extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      startDate: "",
      project_types: [],
      rprojectType: "",
      financing_types: [],
      financingType: "",
      financing_sources: [],
      financingSource: "",
      project_status: [],
      rprojectStatus: "",
      research_lines: [],
      researchLine: "",
      description: "",
      rprojectGoals: [],
      rgroups: [],
      researchGroups: [],
      missingData: false,
      axiosStatus: false,
      showingAlert: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);

    this.submitForm = this.submitForm.bind(this);
    this.checkFields = this.checkFields.bind(this);
    this.addGoal = this.addGoal.bind(this);
    this.deleteGoal = this.deleteGoal.bind(this);

    this.getProjectTypes = this.getProjectTypes.bind(this);
    this.getFinancingTypes = this.getFinancingTypes.bind(this);
    this.getFinancingSources = this.getFinancingSources.bind(this);
    this.getProjectStatus = this.getProjectStatus.bind(this);
    this.getResearchLines = this.getResearchLines.bind(this);
    this.getResearchGroups = this.getResearchGroups.bind(this);

    this.getProjectTypes();
    this.getFinancingTypes();
    this.getFinancingSources();
    this.getProjectStatus();
    this.getResearchLines();
    this.getResearchGroups();
  }

  getProjectTypes() {
    var config = {
      method: 'get',
      url: 'http://localhost:8080/rprojecttype',
      headers: {},
    };

    axios(config)
      .then(response => {
        // console.log(response.data);
        this.setState({ ["project_types"]: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getFinancingTypes() {
    var config = {
      method: 'get',
      url: 'http://localhost:8080/financingtype',
      headers: {},
    };

    axios(config)
      .then(response => {
        // console.log(response.data);
        this.setState({ ["financing_types"]: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  getFinancingSources() {
    var config = {
      method: 'get',
      url: 'http://localhost:8080/financingsource',
      headers: {},
    };

    axios(config)
      .then(response => {
        // console.log(response.data);
        this.setState({ ["financing_sources"]: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getProjectStatus() {
    var config = {
      method: 'get',
      url: 'http://localhost:8080/status',
      headers: {},
    };

    axios(config)
      .then(response => {
        // console.log(response.data);
        this.setState({ ["project_status"]: response.data });
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

  getResearchGroups() {
    var config = {
      method: 'get',
      url: 'http://localhost:8080/researchgroup',
      headers: {},
    };

    axios(config)
      .then(response => {
        // console.log(response.data);
        var proyectoSinGrupo = {
          'name': "-- Proyecto sin grupo --"
        };

        response.data.splice(0, 0, proyectoSinGrupo)
        this.setState({ ["rgroups"]: response.data });
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
        if (prop === "researchLine") {
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

    // copy of this.state
    let state = { ...this.state };

    // remove unnecessary fields
    delete state.project_objective;
    delete state.project_types;
    delete state.financing_types;
    delete state.financing_sources;
    delete state.project_status;
    delete state.research_lines;
    delete state.missingData;
    delete state.axiosStatus;
    delete state.showingAlert;
    delete state.rgroups;
    delete state.researchGroups;

    if (state.researchLine === "") {
      delete state.researchLine;
    }

    // Validate fields not empty
    if (!this.checkFields(state)) {
      return;
    }

    // List<ProjectObjective> for ResearchProject
    var rprojectGoals = [];

    for (var i=0; i<this.state.rprojectGoals.length; i++) {

      var goal = {
        description: this.state.rprojectGoals[i],
        isFinished: "N"
      }

      rprojectGoals.push(goal);
    }

    state.rprojectGoals = rprojectGoals;

    var url = "http://localhost:8080/researchProject/create";

    // Empty field when group "-- Proyecto sin grupo --" is selected
    if (this.state.researchGroups.length > 0 && this.state.researchGroups[0].name !== "-- Proyecto sin grupo --")
      url += "/" + this.state.researchGroups[0].id;

    console.log("url: " + url);

    // Turn state copy into JSON object
    var data = JSON.stringify(state);

    console.log("data: " + data);

    var config = {
      method: "post",
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    // Clear input fields
    this.setState({ ["title"]: "" });
    this.setState({ ["startDate"]: "" });
    this.setState({ ["rprojectType"]: "" });
    this.setState({ ["financingType"]: "" });
    this.setState({ ["financingSource"]: "" });
    this.setState({ ["rprojectStatus"]: "" });
    this.setState({ ["researchLine"]: "" });
    this.setState({ ["description"]: "" });
    this.setState({ ["rprojectGoals"]: [] });
    this.setState({ ["researchGroups"]: [] });

    var project_id;

    await axios(config)
      .then(response => {
        var responseStatus = response.status;
        console.log(responseStatus)
        if (responseStatus === 200 || responseStatus === 201) {
          project_id = response.data.id_research_project;
          this.setState({ ["axiosStatus"]: true });
        } else {
          this.setState({ ["axiosStatus"]: false });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ ["axiosStatus"]: false });
      });

    this.setState({ ["showingAlert"]: true });

    setTimeout(() => {
      this.setState({
        ["showingAlert"]: false
      });
    }, 2800);
  }

  handleInputChange(event, index) {
    if (!event.target) {
      // Select fields
      if (event.name === "rprojectType") {
        this.setState({
          rprojectType: this.state.project_types[event.value]
        })
      } else if (event.name === "financingType") {
        this.setState({
          financingType: this.state.financing_types[event.value]
        })
      } else if (event.name === "financingSource") {
        this.setState({
          financingSource: this.state.financing_sources[event.value]
        })
      } else if (event.name === "rprojectStatus") {
        this.setState({
          rprojectStatus: this.state.project_status[event.value]
        })
      } else if (event.name === "researchLine") {
        this.setState({
          researchLine: this.state.research_lines[event.value]
        })
      } else if (event.name === "researchGroups") {
        this.setState({
          researchGroups: [this.state.rgroups[event.value]]
        })
      }
    } else {
      const target = event.target;

      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      if (target.name === "rprojectGoals") {
        var rprojectGoals = [...this.state.rprojectGoals];

        rprojectGoals[index] = value;

        this.setState({
          [name]: rprojectGoals
        });
      } else {
        this.setState({
          [name]: value
        });
      }
    }
  }

  addGoal() {
    this.setState(prevState => ({
      rprojectGoals: [...prevState.rprojectGoals, ""]
    }));
  }

  deleteGoal(index) {
    var rprojectGoals = [...this.state.rprojectGoals];

    rprojectGoals.splice(index, 1)

    this.setState({
      rprojectGoals: rprojectGoals
    });
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
    return (
      <DashboardLayout>
        <AppBar className={`${this.state.showingAlert ? 'alert-shown' : 'alert-hidden'}`} position={"fixed"} sx={{ zIndex: 1300}}>
          < br/>
          <Card sx={{ marginLeft: '40%', width: '500px', boxShadow: 3}}>
            {this.state.axiosStatus ? (
              <SoftTypography variant="h4" p={2}>
                <p style={{ display: 'inline', color: '#82d616' }}>Correcto:</p>
                &nbsp;El proyecto se creó exitosamente
              </SoftTypography>
            ) : (
              <SoftTypography variant="h4" p={2}>
                <p style={{ display: 'inline', color: '#ea0606' }}>Error:</p>
                &nbsp;No se ha podido crear el proyecto
              </SoftTypography>
            )}
          </Card>
        </AppBar>
        
        <DashboardNavbar />
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Card>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h3">Crear nuevo proyecto</SoftTypography>
              </SoftBox>
              <SoftBox p={3}>
                <SoftTypography variant="body2" mb={1}>Título:</SoftTypography>
                <SoftInput name="title" placeholder="Título"
                  value={this.state.title}
                  onChange={this.handleInputChange} />
                {this.state.missingData && !this.state.title &&
                <div style={{display: 'flex'}}>
                  <Icon color="error" sx={{marginTop: 0.3, marginLeft: 0.3}}>warning</Icon>
                  <SoftTypography variant="body2" color="error" mb={1}>&nbsp;Por favor llenar este campo</SoftTypography>
                </div>}

                <SoftTypography variant="body2" mt={3} mb={1}>Fecha inicio:</SoftTypography>
                <SoftInput name="startDate" type="date" placeholder="Fecha inicio"
                  value={this.state.startDate}
                  onChange={this.handleInputChange} />
                {this.state.missingData && !this.state.startDate &&
                <div style={{display: 'flex'}}>
                  <Icon color="error" sx={{marginTop: 0.3, marginLeft: 0.3}}>warning</Icon>
                  <SoftTypography variant="body2" color="error" mb={1}>&nbsp;Por favor llenar este campo</SoftTypography>
                </div>}

                <SoftTypography variant="body2" mt={3} mb={1}>Tipo de proyecto:</SoftTypography>
                <Select name="rprojectType" onChange={this.handleInputChange}
                styles={customStyles}
                value={ this.state.rprojectType === "" ? "" : {label: this.state.rprojectType.type, value: this.state.rprojectType} }
                placeholder="Tipo de proyecto"
                options={this.state.project_types.map((ptype, index) => ({
                  value: index,
                  label: ptype.type,
                  name: "rprojectType"
                }))} />
                {this.state.missingData && !this.state.rprojectType &&
                <div style={{display: 'flex'}}>
                  <Icon color="error" sx={{marginTop: 0.3, marginLeft: 0.3}}>warning</Icon>
                  <SoftTypography variant="body2" color="error" mb={1}>&nbsp;Por favor llenar este campo</SoftTypography>
                </div>}

                <SoftTypography variant="body2" mt={3} mb={1}>Tipo de financiación:</SoftTypography>
                <Select name="financingType" onChange={this.handleInputChange}
                styles={customStyles}
                value={ this.state.financingType === "" ? "" : {label: this.state.financingType.type, value: this.state.financingType} }
                placeholder="Tipo de financiación"
                options={this.state.financing_types.map((ftype, index) => ({
                  value: index,
                  label: ftype.type,
                  name: "financingType"
                }))} />
                {this.state.missingData && !this.state.financingType &&
                <div style={{display: 'flex'}}>
                  <Icon color="error" sx={{marginTop: 0.3, marginLeft: 0.3}}>warning</Icon>
                  <SoftTypography variant="body2" color="error" mb={1}>&nbsp;Por favor llenar este campo</SoftTypography>
                </div>}

                <SoftTypography variant="body2" mt={3} mb={1}>Fuente de financiación:</SoftTypography>
                <Select name="financingSource" onChange={this.handleInputChange}
                styles={customStyles}
                value={ this.state.financingSource === "" ? "" : {label: this.state.financingSource.source, value: this.state.financingSource} }
                placeholder="Fuente de financiación"
                options={this.state.financing_sources.map((fsource, index) => ({
                  value: index,
                  label: fsource.source,
                  name: "financingSource"
                }))} />
                {this.state.missingData && !this.state.financingSource &&
                <div style={{display: 'flex'}}>
                  <Icon color="error" sx={{marginTop: 0.3, marginLeft: 0.3}}>warning</Icon>
                  <SoftTypography variant="body2" color="error" mb={1}>&nbsp;Por favor llenar este campo</SoftTypography>
                </div>}

                {/* <SoftTypography variant="body2" mt={3} mb={1}>Estatus de proyecto:</SoftTypography>
                <select name="rprojectStatus" onChange={this.handleInputChange}>
                  <option value="Select a Research Area"> -- Selecciona Estatus de proyecto -- </option>
                  {this.state.project_status.map((pstatus, index) => <option key={pstatus.id} value={index}>{pstatus.status}</option>)}
                </select> */}

                <SoftTypography variant="body2" mt={3} mb={1}>Estatus de proyecto:</SoftTypography>
                <Select name="rprojectStatus" onChange={this.handleInputChange}
                styles={customStyles}
                value={ this.state.rprojectStatus === "" ? "" : {label: this.state.rprojectStatus.status, value: this.state.rprojectStatus} }
                placeholder="Estatus de proyecto"
                options={this.state.project_status.map((pstatus, index) => ({
                  value: index,
                  label: pstatus.status,
                  name: "rprojectStatus"
                }))} />
                {this.state.missingData && !this.state.rprojectStatus &&
                <div style={{display: 'flex'}}>
                  <Icon color="error" sx={{marginTop: 0.3, marginLeft: 0.3}}>warning</Icon>
                  <SoftTypography variant="body2" color="error" mb={1}>&nbsp;Por favor llenar este campo</SoftTypography>
                </div>}

                <SoftTypography variant="body2" mt={3} mb={1}>Línea de investigación:</SoftTypography>
                <Select name="researchLine" onChange={this.handleInputChange}
                styles={customStyles}
                value={ this.state.researchLine === "" ? "" : {label: this.state.researchLine.name, value: this.state.researchLine} }
                placeholder="Línea de investigación"
                options={this.state.research_lines.map((rline, index) => ({
                  value: index,
                  label: rline.name,
                  name: "researchLine"
                }))} />

                <SoftTypography variant="body2" mt={3} mb={1}>Grupo al que pertenece:</SoftTypography>
                <Select name="researchgroup" onChange={this.handleInputChange}
                styles={customStyles}
                value={ this.state.researchGroups.length === 0 ? "" : {label: this.state.researchGroups[0].name, value: this.state.researchGroups} }
                placeholder="Grupo de Investigación al que pertenece"
                options={this.state.rgroups.map((rgroup, index) => ({
                  value: index,
                  label: rgroup.name,
                  name: "researchGroups"
                }))} />

                <SoftTypography variant="body2" mt={3} mb={1}>Descripción:</SoftTypography>
                <SoftInput name="description" placeholder="Descripción" multiline rows={3}
                  value={this.state.description}
                  onChange={this.handleInputChange} />
                {this.state.missingData && !this.state.description &&
                <div style={{display: 'flex'}}>
                  <Icon color="error" sx={{marginTop: 0.3, marginLeft: 0.3}}>warning</Icon>
                  <SoftTypography variant="body2" color="error" mb={1}>&nbsp;Por favor llenar este campo</SoftTypography>
                </div>}

                {/* <SoftTypography variant="body2" mt={3} mb={1}>Objetivos:</SoftTypography>
                <SoftInput name="rprojectGoals" placeholder="Objetivos (separados por comas)" multiline rows={5}
                  value={this.state.rprojectGoals}
                  onChange={this.handleInputChange} /> */}

                <SoftTypography variant="body2" mt={3} mb={1}>Objetivos:</SoftTypography>
                {this.state.rprojectGoals.map((goal, index) => (
                  <div key={index} style={{width: '100%', display: 'flex', marginBottom: '5px'}}>
                    <div style={{flexGrow: 1}}> 
                      <SoftInput name="rprojectGoals" placeholder="Nuevo objetivo"
                      value={goal}
                      onChange={event => this.handleInputChange(event, index)} />
                    </div>
                    <div style={{marginLeft: '5px'}}> 
                      <SoftButton color="error" iconOnly size="medium" onClick={() => {this.deleteGoal(index)}}>
                        <Icon>close</Icon>
                      </SoftButton>
                    </div>
                  </div>
                ))}
                <SoftButton sx={{ border: 1, borderColor: '#bdbdbd' }} iconOnly size="medium" onClick={this.addGoal}>
                  <Icon>add</Icon>
                </SoftButton>
                {this.state.missingData && this.state.rprojectGoals.length === 0 &&
                <div style={{display: 'flex'}}>
                  <Icon color="error" sx={{marginTop: 0.3, marginLeft: 0.3}}>warning</Icon>
                  <SoftTypography variant="body2" color="error" mb={1}>&nbsp;Por favor agregar al menos un objetivo</SoftTypography>
                </div>}

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

export default CreateProject;
