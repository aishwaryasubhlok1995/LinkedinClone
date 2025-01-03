import axios from "axios";
import {
  APPLICANT_DETAILS,
  APPLICANT_LOCATION_DATA,
  APPLICANT_LOGIN,
  APPLICANT_SIGNUP,
  APPLICANT_SUMMARYINSERT_DATA,
  APPLICANT_EXPERIENCEINSERT_DATA,
  APPLICANT_SCHOOLINSERT_DATA,
  APPLICANT_SKILLSINSERT_DATA,
  APPLICANT_GETUSER_DATA,
  SIGNUPSCHOOL,
  ADD_PROFILE_PICTURE,
  ADD_USER_RESUME,
  SEARCH_USER_BY_NAME
} from "./types";
import { setHeader } from "../components/common/auth";

const ROOT_URL = "http://localhost:3001";

export const proDetails = data => async dispatch => {
  try {
    setHeader();
    const res = await axios.post(`${ROOT_URL}/prodetails`, data);
    dispatch({
      type: APPLICANT_DETAILS,
      payload: res.data.updatedList,
      statusCode: res.status
    });
  } catch (e) {
    return {
      type: APPLICANT_DETAILS,
      payload: e
    };
  }
};
export const getuserdata = data => async dispatch => {
  try {
    setHeader();
    const res = await axios.post(`${ROOT_URL}/getuserdata`, data);
    dispatch({
      type: APPLICANT_GETUSER_DATA,
      payload: res.data.updatedList,
      statusCode: res.status
    });
  } catch (e) {
    return {
      type: APPLICANT_GETUSER_DATA,
      payload: e
    };
  }
};
export const summaryinsert = data => async dispatch => {
  try {
    setHeader();
    const res = await axios.post(`${ROOT_URL}/insertsummary`, data);
    dispatch({
      type: APPLICANT_SUMMARYINSERT_DATA,
      payload: res.data.updatedList,
      statusCode: res.status
    });
  } catch (e) {
    return {
      type: APPLICANT_SUMMARYINSERT_DATA,
      payload: e
    };
  }
};
export const schoolinsert = data => async dispatch => {
  try {
    setHeader();
    const res = await axios.post(`${ROOT_URL}/schoolinsert`, data);
    dispatch({
      type: APPLICANT_SCHOOLINSERT_DATA,
      payload: res.data.updatedList,
      statusCode: res.status
    });
  } catch (e) {
    return {
      type: APPLICANT_SCHOOLINSERT_DATA,
      payload: e
    };
  }
};
export const skillsinsert = data => async dispatch => {
  try {
    setHeader();
    const res = await axios.post(`${ROOT_URL}/skillsinsert`, data);
    dispatch({
      type: APPLICANT_SKILLSINSERT_DATA,
      payload: res.data.updatedList,
      statusCode: res.status
    });
  } catch (e) {
    return {
      type: APPLICANT_SKILLSINSERT_DATA,
      payload: e
    };
  }
};
export const experienceinsert = data => async dispatch => {
  try {
    setHeader();
    const res = await axios.post(`${ROOT_URL}/experiencesummary`, data);
    dispatch({
      type: APPLICANT_EXPERIENCEINSERT_DATA,
      payload: res.data.updatedList,
      statusCode: res.status
    });
  } catch (e) {
    return {
      type: APPLICANT_EXPERIENCEINSERT_DATA,
      payload: e
    };
  }
};
export const locationData = data => async dispatch => {
  try {
    setHeader();
    const res = await axios.post(`${ROOT_URL}/locationdata`, data);
    dispatch({
      type: APPLICANT_LOCATION_DATA,
      payload: res.data.updatedList,
      statusCode: res.status
    });
  } catch (e) {
    return {
      type: APPLICANT_LOCATION_DATA,
      payload: e
    };
  }
};

export const signupschool = data => async dispatch => {
  try {
    setHeader();
    const res = await axios.post(`${ROOT_URL}/signupschool`, data);
    dispatch({
      type: SIGNUPSCHOOL,
      payload: res.data.updatedList,
      statusCode: res.status
    });
  } catch (e) {
    return {
      type: SIGNUPSCHOOL,
      payload: e
    };
  }
};

export function login(data, callback) {
  try {
    setHeader();
    const request = axios
      .post(`${ROOT_URL}/login`, data)
      .then(res => callback(res));

    return {
      type: APPLICANT_LOGIN,
      payload: request.data.updatedList,
      statusCode: request.status
    };
  } catch (e) {
    return {
      type: APPLICANT_LOGIN,
      payload: e
    };
  }
}

export function register(data, callback) {
  try {
    const request = axios
      .post(`${ROOT_URL}/register`, data)
      .then(res => callback(res));

    return {
      type: APPLICANT_SIGNUP,
      payload: request
    };
  } catch (e) {
    return {
      type: APPLICANT_SIGNUP,
      payload: e
    };
  }
}

export const addPhoto = (url, username) => async dispatch => {
  try {
    setHeader();
    const res = await axios.post(`${ROOT_URL}/addProfilePhoto/${username}`, {
      url1: url
    });
    dispatch({
      type: ADD_PROFILE_PICTURE,
      payload: res.data
    });
  } catch (e) {
    return {
      type: ADD_PROFILE_PICTURE,
      payload: e
    };
  }
};
export const addResume = (url, username) => async dispatch => {
  try {
    setHeader();
    const res = await axios.post(`${ROOT_URL}/addProfileResume/${username}`, {
      url1: url
    });
    dispatch({
      type: ADD_USER_RESUME,
      payload: res.data
    });
  } catch (e) {
    return {
      type: ADD_USER_RESUME,
      payload: e
    };
  }
};

export const searchUser = values => async dispatch => {
  try {
    setHeader();
    console.log("values", values);
    const res = await axios.get(
      `${ROOT_URL}/searchUserByName/${values.userName}/${values.username}`
    );
    dispatch({
      type: SEARCH_USER_BY_NAME,
      payload: res.data
    });
  } catch (e) {
    return {
      type: SEARCH_USER_BY_NAME,
      payload: e
    };
  }
};
