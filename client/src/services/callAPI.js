import { notification } from "antd";
import axios from "axios";
import { parse, stringify } from "qs";

const axioInstance = axios.create({
  baseURL: "http://localhost:5000",
});

const callApi = ({ uriEndPoint, params, body, suffix }) =>
  new Promise((resolve, reject) => {
    let url = uriEndPoint.url;
    if (suffix) {
      url += suffix;
    }
    axioInstance({
      method: uriEndPoint.method,
      url: url,
      params: params,
      data: body,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        const errorMessage = err.response.data.message;

        notification.error({
          message: "Something went wrong!",
          description: errorMessage,
        });
        reject(err.response);
      });
  });

export default callApi;
