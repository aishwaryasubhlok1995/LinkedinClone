import axios from "axios";
import {
  SEARCH_JOB,
  APPLY_JOB,
  SAVE_JOB,
  POST_A_JOB,
  EDIT_JOB,
  GET_JOB_BY_ID,
  GET_SAVED_JOB,
  GET_APPLIED_JOB,
  VIEW_JOB_APPLICATIONS
} from "./types";
import { setHeader } from "../components/common/auth";
import { getJWTUsername } from "../components/common/auth";

const ROOT_URL = "http://localhost:3001";

export const searchJob = (data, callback) => async dispatch => {
  try {
    // var email = getJWTUsername();
    //setHeader();
    const res = await axios.post(`${ROOT_URL}/searchJob`, data);
    console.log(res.status);
    console.log("search a job", res.data);
    dispatch({
      type: SEARCH_JOB,
      payload: res.data
    });
    callback();
  } catch (e) {
    return {
      type: SEARCH_JOB,
      payload: e
    };
  }
};

export const getsavedJob = (data, callback) => async dispatch => {
  try {
    // var email = getJWTUsername();
    //setHeader();
    const res = await axios.post(`${ROOT_URL}/getsavejob`, data);
    console.log(res.status);
    console.log("search a job", res.data);
    dispatch({
      type: GET_SAVED_JOB,
      payload: res.data
    });
    callback();
  } catch (e) {
    return {
      type: GET_SAVED_JOB,
      payload: e
    };
  }
};
export const getAppliedJob = (data, callback) => async dispatch => {
  try {
    // var email = getJWTUsername();
    //setHeader();
    const res = await axios.post(`${ROOT_URL}/getappliedjob`, data);
    console.log(res.status);
    console.log("search a job", res.data);
    dispatch({
      type: GET_APPLIED_JOB,
      payload: res.data
    });
    callback();
  } catch (e) {
    return {
      type: GET_SAVED_JOB,
      payload: e
    };
  }
};

export const saveJob = (data, callback) => async dispatch => {
  try {
    var email = getJWTUsername();
    setHeader();
    const res = await axios.post(`${ROOT_URL}/saveJob`, data);
    dispatch({
      type: SAVE_JOB,
      payload: res.data
    });
    callback();
  } catch (e) {
    return {
      type: SAVE_JOB,
      payload: e
    };
  }
};

export const applyJob = (data, callback) => async dispatch => {
  try {
    var email = getJWTUsername();
    setHeader();
    const res = await axios.post(`${ROOT_URL}/applyJob`, data);
    dispatch({
      type: APPLY_JOB,
      payload: res.data
    });
    callback();
  } catch (e) {
    return {
      type: APPLY_JOB,
      payload: e
    };
  }
};

export const postAJob = data => async dispatch => {
  try {
    setHeader();
    const res = await axios.post(`${ROOT_URL}/recruiter/post-a-job`, data);
    dispatch({
      type: POST_A_JOB,
      payload: res.data
    });
  } catch (e) {
    return {
      type: POST_A_JOB,
      payload: e
    };
  }
};

export const editJob = data => async dispatch => {
  try {
    setHeader();
    const res = await axios.post(`${ROOT_URL}/recruiter/edit-job`, data);
    dispatch({
      type: EDIT_JOB,
      payload: res.data
    });
  } catch (e) {
    return {
      type: EDIT_JOB,
      payload: e
    };
  }
};

export const getJobById = (jobId, callback) => async dispatch => {
  try {
    setHeader();
    const res = await axios.get(`${ROOT_URL}/getPropertyById/${jobId}`);
    dispatch({
      type: GET_JOB_BY_ID,
      payload: res.data
    });
    callback();
  } catch (e) {
    return {
      type: GET_JOB_BY_ID,
      payload: e
    };
  }
};

export const getJobApplications = jobId => async dispatch => {
  try {
    setHeader();
    const res = await axios.get(`${ROOT_URL}/getJobApplications/${jobId}`);
    dispatch({
      type: VIEW_JOB_APPLICATIONS,
      payload: res.data
    });
  } catch (e) {
    return {
      type: VIEW_JOB_APPLICATIONS,
      payload: e
    };
  }
};
