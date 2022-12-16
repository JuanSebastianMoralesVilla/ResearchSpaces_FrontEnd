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

import {createGroupTable } from "layouts/tables/data/groupUserTableData"
import PropTypes from 'prop-types';

GroupTable.propTypes = {
  groupId: PropTypes.any,
};
function GroupTable({groupId}) {
  console.log(groupId)
  const [groupTableData, setGroupTableData] = useState(null);
  function getMembersTableSuccess(table) {
    setGroupTableData(table);
  }

  function getTableFail(error) {
    console.log(error);
  }

  useEffect(() => {
    createGroupTable(getMembersTableSuccess, getTableFail,projectId);
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
               {groupTableData ? (
              <Table columns={groupTableData.columns} rows={groupTableData.rows} />
            ) : (
              <ClipLoader color="black"></ClipLoader>
            )}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
  );
}

export {GroupTable}
