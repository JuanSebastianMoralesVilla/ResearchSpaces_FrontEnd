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

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";
import { ClipLoader } from "react-spinners";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftAlert from "components/SoftAlert";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

//Authentication
import { authentication, backendRequest } from "utils/requests";



function SignIn() {
  const [rememberMe, setRememberMe] = useState(window.localStorage.getItem("remember") == "true");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const savedUsername = window.localStorage.getItem("username") ?? "";
  const username = useRef();
  const password = useRef();

  const navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleLoginSubmit = async () => {
    setErrorMessage(null)
    const currentUsername = username.current.children[0].value;
    const currentPassword = password.current.children[0].value;

    window.localStorage.setItem("remember", rememberMe);
    if (rememberMe) {
      window.localStorage.setItem("username", currentUsername);
    } else {
      window.localStorage.removeItem("username");
    }
    try {
      setLoading(true);
      // const { data } = await authentication({
      //   username: currentUsername,
      //   password: currentPassword,
      // });

      // const { role } = await backendRequest("GET","/user/userType/" + window.localStorage.getItem("username"));

      
      // window.localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
      // window.localStorage.setItem("tokenType", JSON.stringify(data.tokenType));
      // window.localStorage.setItem("role", JSON.stringify(role.type));
      if ((currentUsername === "sebastianjaramillo" && currentPassword === "Sebastian12345") ||
      (currentUsername === "1" && currentPassword === "1")){
        window.localStorage.setItem("role", "teacher");
      } else if ((currentUsername === "carolinapasuy" && currentPassword === "Carolina12345") ||
      (currentUsername === "2" && currentPassword === "2")){
        window.localStorage.setItem("role", "student");
      } else {
        throw error
      }

      username.current.children[0].value = "";
      password.current.children[0].value = "";
      navigate("/research-project");
    } catch (error) {
      var message = "Credenciales incorrectas"
      setErrorMessage(message)
    }
    setLoading(false);
  };

  return (
    <CoverLayout
      title="Bienvenido"
      description="Ingrese su usuario y contraseña de la universidad ICESI"
      image={curved9}
      color="dark"
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Usuario
            </SoftTypography>
          </SoftBox>
          <SoftInput
            defaultValue={savedUsername}
            ref={username}
            type="text"
            placeholder="Usuario"
            required
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Contraseña
            </SoftTypography>
          </SoftBox>
          <SoftInput ref={password} type="password" placeholder="Contraseña" required />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Recordar nombre de usuario
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton onClick={() => handleLoginSubmit()} color="dark" fullWidth>
            {loading ? <ClipLoader size={16.8} color="#ffffff" /> : "ENTRAR"}
          </SoftButton>
        </SoftBox>
        <SoftAlert
          variant="contained"
          color="error"
          visibility={errorMessage ? "visible" : "hidden"}
          dismissible
        >
          {errorMessage ?? "Default message"}
        </SoftAlert>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
