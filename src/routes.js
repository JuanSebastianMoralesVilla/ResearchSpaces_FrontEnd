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

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import CreateProject from "layouts/create-project";
import CreateGroup from "layouts/create-group";
import Metrics from "layouts/metrics";
import Tables from "layouts/tables";
import Projects from "layouts/projects";
import Groups from "layouts/groups";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Project from "layouts/project";
import ProjectRequest from "layouts/project-request";
//import Profile from "layouts/profile";
import SignIn from "layouts/authentication/log-in";
import SignUp from "layouts/authentication/sign-up";
import GroupInfo from "layouts/group-info";

// Custom UI React Layouts
import CheckRequest from "layouts/join-request/check-request";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";


const routes = [
  { type: "title", title: "Vista", key: "view-pages" },
  {
    type: "collapse",
    name: "Proyectos",
    key: "research-project",
    route: "/research-project",
    icon: <Document size="12px" />,
    component: <Projects />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Grupos",
    key: "research-group",
    route: "/research-group",
    icon: <Office size="12px" />,
    component: <Groups />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Metricas",
    key: "metrics",
    route: "/metrics/:id",
    icon: <CustomerSupport size="12px" />,
    component: <Metrics />,
    noCollapse: true,
  },
  { type: "title", title: "Creación", key: "create-pages" },
  {
    type: "collapse",
    name: "Crear proyecto",
    key: "create-project",
    route: "/create-project",
    icon: <Shop size="12px" />,
    component: <CreateProject />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Crear grupo",
    key: "create-group",
    route: "/create-group",
    icon: <Shop size="12px" />,
    component: <CreateGroup />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Solicitudes",
    key: "check-request",
    route: "/check-request",
    icon: <SpaceShip size="12px" />,
    component: <CheckRequest />,
    noCollapse: true,
  },
  { type: "title", title: "Cuenta", key: "account-pages" },
  {
    type: "route",
    name: "Project",
    key: "project",
    route: "/research-project/:id_research_project",
    icon: <CustomerSupport size="12px" />,
    component: <Project />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Group",
    key: "group",
    route: "/group-info/:id",
    icon: <CustomerSupport size="12px" />,
    component: <GroupInfo />,
    noCollapse: true,
  },
  
  {
    type: "collapse",
    name: "Cerrar sesión",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Project Request",
    key: "project-request",
    route: "/project-request/",
    icon: <SpaceShip size="12px" />,
    component: <ProjectRequest />,
    noCollapse: true,
  },
];

export default routes;
