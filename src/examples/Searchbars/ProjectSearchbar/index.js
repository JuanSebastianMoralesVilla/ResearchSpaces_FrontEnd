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

import Combobox from "react-widgets/Combobox";
import Select from "react-select";
import { statusData,projectTypeData,financingTypeData,financingSourceData } from "./data";
import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";

// Soft UI Dashboard React examples
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for TableSearchbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Searchbars/TableSearchbar/styles";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

let hash = undefined;

function ProjectSearchbar({ absolute, light, isMini, updateTable }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [status, setStatus] = useState();
  const [projectType, setProjectType] = useState();
  const [financingType, setFinancingType] = useState();
  const [financingSource, setFinancingSource] = useState(); 
  const route = useLocation().pathname.split("/").slice(1);

  const statusHandler = (e) => {
    if(e != null) {
      setStatus(e.value);
    }
  };

  const projectTypeHandler = (e) => {
    if(e != null) {
      setProjectType(e.value);
    }
  };

  const financingTypeHandler = (e) => {
    if(e != null) {
      setFinancingType(e.value);
    }
  };

  const financingSourceHandler = (e) => {
    if(e != null) {
      setFinancingSource(e.value);
    }
  };

  function ValidateFilter(status, projectType, financingType, financingSource) {
    console.log("status: " + status)
    hash = new Map();

    //Reviso cada filtro, el que no este indefinido entra en la consulta
    if (typeof status !== "undefined") {
      if (status.length !== 0) {
        hash.set("rprojectStatus", status);
      }
    }
    if (typeof projectType !== "undefined") {
      if (projectType.length !== 0) {
        hash.set("rprojectType", projectType);
      }
    }
    if (typeof financingType !== "undefined") {
      if (financingType.length !== 0) {
        hash.set("financingType", financingType);
      }
    }
    if (typeof financingSource !== "undefined") {
      if (financingSource.length !== 0) {
        hash.set("financingSource", financingSource);
      }
    }

    if (hash.size !== 0) {
      console.log("Filtro melo. vamos a actualizar")
      updateTable(hash);
      hash = undefined;
    } else {
      hash = undefined;
      updateTable(hash);
    }
  }

  const [projectStatusSelectRef, setprojectStatusSelectRef] = useState();
  const [projectTypeSelectRef, setprojectTypeSelectRef] = useState();
  const [financingTypeSelectRef, setfinancingTypeSelectRef] = useState();
  const [financingSourceSelectRef, setfinancingSourceSelectRef] = useState();

  function clearFilters() {
    console.log("clear filters");

    statusHandler({value: undefined});
    projectStatusSelectRef.clearValue();
    projectTypeHandler({value: undefined});
    projectTypeSelectRef.clearValue();
    financingTypeHandler({value: undefined});
    financingTypeSelectRef.clearValue();
    financingSourceHandler({value: undefined});
    financingSourceSelectRef.clearValue();
  }

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        image={<img src={team2} alt="person" />}
        title={["New message", "from Laur"]}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image={<img src={logoSpotify} alt="person" />}
        title={["New album", "by Travis Scott"]}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="secondary"
        image={
          <Icon fontSize="small" sx={{ color: ({ palette: { white } }) => white.main }}>
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );

  const customStyles = {
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: '#b0bec5',
      fontSize: '0.95rem',
      fontWeight: '380',
    })
  }

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        {isMini ? null : (
          <SoftBox sx={{ width: '100%', display: 'flex' }}>
            <SoftBox pr={1} sx={{ width: '15%', alignSelf: 'flex-end' }}>
              <SoftTypography>Estado</SoftTypography>
              <Select
                options={statusData}
                
                placeholder="Seleccionar..."
                styles={customStyles}
                ref={ref => {
                  setprojectStatusSelectRef(ref);
                }}
                isSearchable={false}
                isClearable={false}
                onChange={statusHandler}
              ></Select>
            </SoftBox>
            <SoftBox pr={1} sx={{ width: '26%', alignSelf: 'flex-end' }}>
              <SoftTypography>Tipo de Proyecto</SoftTypography>
              <Select
                options={projectTypeData}
                
                placeholder="Seleccionar..."
                styles={customStyles}
                ref={ref => {
                  setprojectTypeSelectRef(ref);
                }}
                isSearchable={false}
                isClearable={false}
                onChange={projectTypeHandler}
              ></Select>
            </SoftBox>
            <SoftBox pr={1} sx={{ width: '18%', alignSelf: 'flex-end' }}>
              <SoftTypography>Tipo de Financiación</SoftTypography>
              <Select
                options={financingTypeData}
                
                placeholder="Seleccionar..."
                styles={customStyles}
                ref={ref => {
                  setfinancingTypeSelectRef(ref);
                }}
                isSearchable={false}
                isClearable={false}
                onChange={financingTypeHandler}
              ></Select>
            </SoftBox>
            <SoftBox pr={1} sx={{ width: '19%', alignSelf: 'flex-end' }}>
              <SoftTypography>Fuente de Financiación</SoftTypography>
              <Select
                options={financingSourceData}
                
                placeholder="Seleccionar..."
                styles={customStyles}
                ref={ref => {
                  setfinancingSourceSelectRef(ref);
                }}
                isSearchable={false}
                isClearable={false}
                onChange={financingSourceHandler}
              ></Select>
            </SoftBox>
            <SoftButton
              sx={{marginTop: 3.7, marginRight: 1}}
              color="info"
              onClick={() => {
                ValidateFilter(status, projectType, financingType, financingSource);
              }}
            >
              Buscar
            </SoftButton>
            <SoftButton
              sx={{marginTop: 3.7}}
              color="secondary"
              onClick={() => {
                clearFilters();
              }}
            >
              Limpiar filtros
            </SoftButton>
          </SoftBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of TableSearchbar
ProjectSearchbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the TableSearchbar
ProjectSearchbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
  updateTable: PropTypes.func,
};

export default ProjectSearchbar;