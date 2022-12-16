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
import SoftBox from "components/SoftBox";
import GroupSearchbar from "examples/Searchbars/GroupSearchbar";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import TableNavbar from "examples/Navbars/TableNavbar";
import SoftTypography from "components/SoftTypography";

import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import { createTable } from "layouts/groups/data/groupsTableData";

// Pagination
import Pagination from 'components/CustomPagination';

function GroupTable() {
  const [hash, setHash] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [groupsTableData, setGroupTableData] = useState(null);

  // Pagination data
  const [currentGroups, setCurrentGroups] = useState([]);

  const updateTable = function (hash) {
    createTable(getTableSuccess, getTableFail, hash);
    setHash(hash)
  };

  function getTableSuccess(table) {
    setGroupTableData(table);
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
    const currentGroups = groupsTableData.rows.slice(offset, offset + pageLimit);
    const columns = [
      { name: "grupo", align: "left" },
      { name: "categoria", align: "left" },
      { name: "facultad", align: "center" },
      { name: "institucion", align: "center" },
    ];
    const rows = currentGroups;

    setCurrentGroups({ columns, rows });
  }

  return (
    <DashboardLayout>
      <SoftBox>
        <SoftBox>
          <TableNavbar />
          <GroupSearchbar updateTable={updateTable} />
        </SoftBox>
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
            ) : groupsTableData != null && Object.entries(groupsTableData.rows).length != 0 ? (
              <Table
                columns={currentGroups.columns}
                rows={currentGroups.rows}
                route="/group-info/"
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
                  No se encontraron grupos con el filtro seleccionado
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
                  No hay grupos en el sistema
                </SoftTypography>
              </SoftBox>
            )}
          </SoftBox>
        </Card>
      </SoftBox>
      {/* Pagination */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '25px'}}>
        {groupsTableData != null && <Pagination
          key={Object.entries(groupsTableData.rows).length}
          totalRecords={Object.entries(groupsTableData.rows).length}
          pageLimit={7}
          pageNeighbours={1}
          onPageChanged={onPageChanged}
        />}
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default GroupTable;
