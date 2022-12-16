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

// Animations
import { ClipLoader } from "react-spinners";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAlert from "components/SoftAlert";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import { getAdmisionTableRequest } from "./data/admissionRequestTableData";

// React
import { useState, useEffect } from "react";

function CheckRequest() {
  useEffect(() => {
    //Runs only on the first render
    getAdmisionTableRequest({
      updateTable: updateAdmissionRequest,
      showAlertOnScreen: showAlertOnScreen,
    });
  }, []);

  const [admissionRequestTableData, setAdmissionRequestTableData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  const [timeOutAlert, setTimeoutAlert] = useState(null);

  const styledAlert = {
    position: "fixed",
    zIndex: "20",
    opacity: "0.9",
    visibility: "hidden",
  };

  function updateAdmissionRequest(newAdmissionTable) {
    setLoading(false);
    setAdmissionRequestTableData(newAdmissionTable);
  }

  function showAlertOnScreen(message) {
    clearTimeout(timeOutAlert);
    setMessageAlert(message);
    setShowAlert(true);

    const timeCode = setTimeout(() => {
      setShowAlert(false);
    }, 2500);

    setTimeoutAlert(timeCode);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftAlert
          color="dark"
          style={{ ...styledAlert, visibility: showAlert ? "visible" : "hidden" }}
        >
          &nbsp; {messageAlert}
        </SoftAlert>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Solicitudes de admisión</SoftTypography>
            </SoftBox>
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
            ) : admissionRequestTableData != null &&
              Object.entries(admissionRequestTableData.rows).length != 0 ? (
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
                <Table
                  columns={admissionRequestTableData.columns}
                  rows={admissionRequestTableData.rows}
                />
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
                  No tiene solicitudes en este momento
                </SoftTypography>
              </SoftBox>
            )}
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CheckRequest;
