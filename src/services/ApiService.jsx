import { generateBasicAuthHeader } from "./BasicAuthHashing";
import {  AUTHORIZATION } from "../constants/Constant";
import DebugLog from "../utils/DebugLog";
import { axiosInstance } from "./AxiosIntercepter";


// get Basic auth
export const getBasicAuth = (includeAuthorizationHeader) => {
  let headers = {};
  if (includeAuthorizationHeader) {
    const headerTokken = generateBasicAuthHeader();
    const authToken = "BASIC " + headerTokken;
    //const authToken = "BASIC " + "eW1jYXVzZXI6MnhKeHp3RUdzaDNTNFF2RUMvZWRwZz09"
    DebugLog("authToken====" + authToken);
    headers[AUTHORIZATION] = authToken;
  }
  return axiosInstance.get(process.env.REACT_APP_BASIC_AUTH_API_URL, { headers });
};

// get user login details
export const getUserLoginDetails = (reqestParams) => {
  return axiosInstance.post(process.env.REACT_APP_LOGIN_API_URL, reqestParams);
};

// create dummy user
export const createUser = (reqestParams) => {
  return axiosInstance.post("/users", reqestParams);
};

// get payout details
export const getPayoutDetails = (reqestParams) => {
  return axiosInstance.post(process.env.REACT_APP_PAYOUT_DETAILS_API_URL, reqestParams);
};

// get payout summary 
export const getPayoutSummary = (reqestParams) => {
  return axiosInstance.post(process.env.REACT_APP_PAYOUT_SUMMARY_API_URL, reqestParams);
};

// get on-hold summary 
export const getOnHoldDetails = (reqestParams) => {
  return axiosInstance.post(process.env.REACT_APP_ON_HOLD_DETAILS_API_URL, reqestParams);
};

// get on-hold details 
export const getOnHoldSummary = (reqestParams) => {
  return axiosInstance.post(process.env.REACT_APP_ON_HOLD_SUMMARY_API_URL, reqestParams);
};

// get on-hold details 
export const getWitholdingTaxDetails = (reqestParams) => {
  return axiosInstance.post(process.env.REACT_APP_WITHOLDING_TAX_DETAILS_API_URL, reqestParams);
};

// get Payout dates 
export const getPayoutDates = (reqestParams) => {
  return axiosInstance.post(process.env.REACT_APP_GET_PAYOUT_DATES_API_URL, reqestParams);
};

// get Exclusion Report
export const getExclusionReports = (reqestParams) => {
  return axiosInstance.post(process.env.REACT_APP_GET_EXCLUSION_LIST_API_URL, reqestParams);
};


// add Exclusion Report
export const addExclusionReports = (reqestParams) => {
  return axiosInstance.post(process.env.REACT_APP_ADD_EXCLUSION_API_URL, reqestParams);
};



// remove Exclusion Report
export const removeExclusionReports = (reqestParams) => {
  return axiosInstance.post(process.env.REACT_APP_REMOVE_EXCLUSION_API_URL, reqestParams);
};

