//import socket from "../socket/socket";
import Axios from "axios";

//const baseUrl = "https://server-who-is-this-pokmeon.onrender.com/v1";
const baseUrl = "http://localhost:5050/v1";

export async function getQ100() {
  try {
    const response = await Axios({
      url: `${baseUrl}/q100`,
      method: "GET",
    });

    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getQ5() {
  try {
    const response = await Axios({
      url: `${baseUrl}/q5`,
      method: "GET",
    });

    return response;
  } catch (e) {
    console.log(e);
  }
}
