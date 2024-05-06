import axios from "axios";

// const authToken = "token b84cf4f51d8a5ad606ece08a8b2d72bdb8f3c1db";

// let APIURL = "invoice.kacc.mn";
let APIURL = "127.0.0.1:8000";
export function PostApi(url, body) {
  return axios
    .post(`http://${APIURL}/${url}`, body, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: authToken,
      },
    })
    .then((response) => {
      console.log("API Response:", response.data);
      return response.data; // Return the response data
    })
    .catch((error) => {
      console.error("There was a problem with the POST request:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
      } else if (error.request) {
        console.log("Request:", error.request);
      } else {
        console.log("Error:", error.message);
      }
      throw error; // Re-throw the error to handle it outside
    });
}

export function PutApi(url, body) {
  return axios
    .put(`http://${APIURL}/${url}`, body, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: authToken,
      },
    })
    .then((response) => {
      console.log("API Response:", response.data);
      return response.data; // Return the response data
    })
    .catch((error) => {
      console.error("There was a problem with the POST request:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
      } else if (error.request) {
        console.log("Request:", error.request);
      } else {
        console.log("Error:", error.message);
      }
      throw error; // Re-throw the error to handle it outside
    });
}

export function GetApi(url) {
  return axios
    .get(`http://${APIURL}/${url}`, {
      headers: {
        // Authorization: authToken,
      },
    })
    .then((response) => {
      console.log("API Response:", response.data);
      return response.data; // Return the response data
    })
    .catch((error) => {
      console.error("There was a problem with the GET request:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
      } else if (error.request) {
        console.log("Request:", error.request);
      } else {
        console.log("Error:", error.message);
      }
      throw error; // Re-throw the error to handle it outside
    });
}
