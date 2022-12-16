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

//React imports
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import Combobox from "react-widgets/Combobox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAlert from "components/SoftAlert";
// import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import TableNavbar from "examples/Navbars/TableNavbar";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import TableSearchbar from "examples/Searchbars/TableSearchbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import { createTable } from "layouts/projects/data/projectsTableData";
import ProjectSearchbar from "examples/Searchbars/ProjectSearchbar";

// Pagination
import Pagination from 'components/CustomPagination';

function ProjectTable() {
  const [projectsTableData, setProjectTableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hash, setHash] = useState(undefined);

  // Pagination data
  const [currentProjects, setCurrentProjects] = useState([]);

  const updateTable = function (hash) {
    createTable(getTableSuccess, getTableFail, hash);
    setHash(hash);
  };

  function getTableSuccess(table) {
    setProjectTableData(table);
    setLoading(false);
  }

  function getTableFail(error) {
    setLoading(false);
  }

  useEffect(() => {
    createTable(getTableSuccess, getTableFail, hash);
  }, []);

  // Pagination update
  function onPageChanged(data) {
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentProjects = projectsTableData.rows.slice(offset, offset + pageLimit);
    const columns = [
      { name: "proyecto", align: "left" },
      { name: "estado", align: "left" },
      { name: "tipo de proyecto", align: "center" },
      { name: "tipo de financiación", align: "center" },
      { name: "fuente de financiación", align: "center" },
    ];
    const rows = currentProjects;

    setCurrentProjects({ columns, rows });
  }

  return (
    <DashboardLayout>
      <SoftBox>
        <TableNavbar />
        <ProjectSearchbar updateTable={updateTable} />
      </SoftBox>
      <SoftBox py={3}>
        <Card>
          <SoftBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
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
            ) : projectsTableData != null && Object.entries(projectsTableData.rows).length != 0 ? (
              <Table
                columns={currentProjects.columns}
                rows={currentProjects.rows}
                route="/research-project/"
              />
            ) : typeof hash !== "undefined" ? (
              <SoftBox
                textAlign="center"
                width="calc(100%)"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={3}
              >
                <SoftTypography width="calc(100%)" variant="h6">
                  No se encontraron proyectos con el filtro seleccionado
                </SoftTypography>
              </SoftBox>
            ) : (
              <SoftBox
                textAlign="center"
                width="calc(100%)"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={3}
              >
                <SoftTypography width="calc(100%)" variant="h6">
                  No hay proyectos en el sistema
                </SoftTypography>
              </SoftBox>
            )}
            
          </SoftBox>
          
        </Card>
      </SoftBox>
      {/* Pagination */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '25px'}}>
        {projectsTableData != null && <Pagination
          key={Object.entries(projectsTableData.rows).length}
          totalRecords={Object.entries(projectsTableData.rows).length}
          pageLimit={7}
          pageNeighbours={1}
          onPageChanged={onPageChanged}
        />}
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default ProjectTable;
