import axios from "axios";

const requestType = {
  POST: "post",
  GET: "get",
  PUT: "put",
  DELETE: "delete",
};

const authentication = async (credentials) => {
  const authUrl = process.env.REACT_APP_AUTH_BASE_URL + "login";
  console.log(authUrl);
  return await axios.post(authUrl, credentials);
};

const backendRequest = async (method, route, body = {}) => {
  
  const fullUrl = `${process.env.REACT_APP_BACKEND}:${process.env.REACT_APP_BACKEND_PORT}/${route}`;
  const tokenType = window.localStorage.getItem("tokenType") ?? "";
  const accessToken = window.localStorage.getItem("accessToken") ?? "";

  var config = {
    method: method,
    url: fullUrl,
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  };

  console.error(config)
  return axios(config)
};

export { authentication, backendRequest, requestType };
