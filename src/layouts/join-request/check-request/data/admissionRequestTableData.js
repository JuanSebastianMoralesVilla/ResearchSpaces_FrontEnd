/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";

//image
import pp from "assets/images/team-1.jpg";

//request
import { backendRequest, requestType } from "utils/requests";

const styledMesaje = {
  width: "20vw",
};

const columns = [
  { name: "usuario", align: "left" },
  { name: "proyecto", align: "left" },
  { name: "mensaje", align: "center" },
  { name: "fecha", align: "center" },
  { name: "action", align: "center" },
];

let currentRequests = [{}];
let updateAdmissionRequest = function () {};
let showAlert = function () {};

function User({ image, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Group({ groupName }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {groupName}
      </SoftTypography>
    </SoftBox>
  );
}

function Message({ message }) {
  return (
    <div style={styledMesaje}>
      <SoftTypography variant="caption" color="secondary" fontWeight="regular">
        {message}
      </SoftTypography>
    </div>
  );
}

function Date({ date }) {
  return (
    <SoftTypography variant="caption" color="secondary" fontWeight="medium">
      {date}
    </SoftTypography>
  );
}

function Action({id}) {
  console.log("ID",id)
  return (
    <SoftBox display="flex" justifyContent="space-between" alignItems="center">
      <SoftBox p={0.5}>
        <SoftButton
          variant="contained"
          color="success"
          size="medium"
          onClick={() => handleAceptedJoinRequest(id)}
        >
          aceptar
        </SoftButton>
      </SoftBox>
      <SoftBox p={0.5}>
        <SoftButton
          variant="contained"
          color="error"
          size="medium"
          onClick={() => handleRejectedJoinRequest(id)}
        >
          rechazar
        </SoftButton>
      </SoftBox>
    </SoftBox>
  );
}

async function handleAceptedJoinRequest(id) {
  //!Realizar llamado al API para aceptar una solicitud de usuario

  try {
    await backendRequest(requestType.PUT, `admissionrequest/changestatus/${id}/1`);
    const index = currentRequests.findIndex((user) => {
      if (user.id == id) {
        user.id == id;
        return user;
      }
    });

    currentRequests.splice(index, 1);
    const newTable = generateTable();
    showAlert("Solicitud rechazada");
    updateAdmissionRequest(newTable);
  } catch {
    showAlert("Problemas internos, intentar más tarde");
  }
}

async function handleRejectedJoinRequest(id) {
  //!Realizar llamado al API para rechazar una solicitud de usuario
  const response = backendRequest(requestType.PUT, `admissionrequest/changestatus/${id}/2`);

  response.then((res)=>{
    console.log(res)
    if (res.status == 200) {

      const index = currentRequests.findIndex((user) => {
        if (user.id == id) {
          user.id == id;
          return user;
        }
      });
  
      currentRequests.splice(index, 1);
      const newTable = generateTable();
      showAlert("Solicitud rechazada");
      updateAdmissionRequest(newTable);
    } else {
      showAlert("Problemas internos, intentar más tarde");
    }
  })

  
}

async function getAdmisionTableRequest({ updateTable, showAlertOnScreen }) {
  showAlert = showAlertOnScreen;
  updateAdmissionRequest = updateTable;

  try {
    const request = backendRequest(requestType.GET, "admissionrequest/pending");
    request.then((res)=>{
      console.log(res)
      currentRequests = res.data;

      const newTable = generateTable();
      updateAdmissionRequest(newTable);
    })
    
  } catch (error) {
    updateAdmissionRequest(null);
    showAlert("Problemas internos, intentar mas tarde");
  }
}

function generateTable(requests = currentRequests) {
  const rows = requests.map((request) => ({
    usuario: (
      <User
        image={pp}
        name={`${request.user ? request.user.firstName : "DEMO"} ${
          request.user ? request.user.lastName : "DEMO"
        }`}
        email={request.user ? request.user.email : "DEMO"}
      />
    ),
    proyecto: <Group groupName={request.researchProject.title ?? "DEMO NAME"} />,
    mensaje: <Message message={request.description}></Message>,
    fecha: <Date date={request.startDate.substring(0,10)}></Date>,
    action: <Action id={request.id}></Action>,
    id: request.admissionrequestid,
  }));
  return {
    columns,
    rows,
  };
}

export { getAdmisionTableRequest };
