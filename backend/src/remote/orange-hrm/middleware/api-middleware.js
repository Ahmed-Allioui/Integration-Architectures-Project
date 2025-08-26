const api = require("../config/orangehrm-api");
const qs = require("querystring");
const createAuthRefreshInterceptor = require("axios-auth-refresh");
const localStorage = require("./localstorage");

/**
 * body to send to receive an access token
 */
const body = qs.stringify({
  client_id: "api_oauth_id",
  client_secret: "oauth_secret",
  grant_type: "password",
  username: "allioui",
  password: "*Safb02da42Demo$",
});

/**
 * Function that will be called to refresh authorization
 * than the request will be sent another time if the token is not valid
 * @param {*} failedRequest
 * @returns
 */
const refreshAuthLogic = (failedRequest) =>
  refreshToken().then(
    (token) => {
      localStorage.setToken(token);
      failedRequest.response.config.headers["Authorization"] = "Bearer " +
        token;
      return Promise.resolve();
    },
  );

/**
 * This function call the api to get a new token
 * @returns
 */
const refreshToken = async function () {
  return api.post(
    `oauth/issueToken`,
    body,
    { skipAuthRefresh: true },
  ).then((res) => res.data.access_token);
};

/**
 * this function call instantiate the interceptor
 */
createAuthRefreshInterceptor.default(api, refreshAuthLogic);

/**
 * Use interceptor to inject the token to requests
 */
api.interceptors.request.use((request) => {
  request.headers["Authorization"] = `Bearer ${localStorage.getToken()}`;
  return request;
});

module.exports = api;
