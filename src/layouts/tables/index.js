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

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import { useState,useEffect } from "react";
import {ClipLoader} from "react-spinners";

// Data
import {createObjectiveTable} from "layouts/tables/data/projectsTableData";

import {createMembersTable } from "layouts/tables/data/authorsTableData"
import PropTypes from 'prop-types';

Tables.propTypes = {
  projectId: PropTypes.any,
};
function Tables({projectId}) {
  console.log(projectId)
  const [authorsTableData, setAuthorsTableData] = useState(null);
  const [objectiveTableData, setObjectiveTableData] = useState(null);

  function getMembersTableSuccess(table) {
    setAuthorsTableData(table);
  }
  function getObjectiveTableSuccess(table) {
    setObjectiveTableData(table);
  }

  function getTableFail(error) {
    console.log(error);
  }

  useEffect(() => {
    createMembersTable(getMembersTableSuccess, getTableFail,projectId);
    createObjectiveTable(getObjectiveTableSuccess,getTableFail,projectId)
  }, []);

  return (    
      <SoftBox py={3}>
        <SoftBox mb={3}>
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
               {authorsTableData ? (
              <Table columns={authorsTableData.columns} rows={authorsTableData.rows} />
            ) : (
              <ClipLoader color="black"></ClipLoader>
            )}
            </SoftBox>
          </Card>
        </SoftBox>
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
            {objectiveTableData ? (
              <Table columns={objectiveTableData.columns} rows={objectiveTableData.rows} />
            ) : (
              <ClipLoader color="black"></ClipLoader>
            )}
          </SoftBox>
        </Card>
      </SoftBox>
  );
}

export {Tables}
