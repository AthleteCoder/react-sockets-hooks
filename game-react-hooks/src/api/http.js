import axios from "axios";
import store from "../state/store";
import { showError } from "../state/notify/notifyTypes";
import { deleteCookie, accessCookie } from "../utils/cookieService";
import { logoutUser } from "../state/user/userTypes";

const http = (withoutInterceptors) => {
  const config = {
    baseURL: "http://localhost:8080/api/v1/",
    withCredentials: "include",
  };
  const instance = axios.create(config);

  instance.defaults.xsrfHeaderName = "X-CSRFToken";
  instance.defaults.xsrfCookieName = "csrftoken";

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      if (!withoutInterceptors) {
        try {
          const message = err.response.data.message;
          if (!message) {
            store.dispatch(
              showError("Oops, There was a problem with the request.")
            );
          } else if (message && err.response.status !== 401) {
            store.dispatch(showError(message));
          }
        } catch (err) {
          store.dispatch(
            showError("Oops, There was a problem with the request.")
          );
        }
      }
      if (err && err.response && err.response.status === 401) {
        if (accessCookie("csrftoken")) {
          deleteCookie("csrftoken");
          store.dispatch(logoutUser());
        }
      }
      return Promise.reject(err);
    }
  );

  return instance;
};

export default http;
