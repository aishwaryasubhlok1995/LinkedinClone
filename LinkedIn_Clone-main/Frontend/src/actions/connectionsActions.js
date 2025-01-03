import axios from "axios";
import {
  GET_ALL_CONNECTIONS,
  ACCEPT_CONNECTION,
  REJECT_CONNECTION,
  SEND_CONNECTION_REQUEST
} from "./types";
import { setHeader } from "../components/common/auth";

const ROOT_URL = "http://localhost:3001";

export const getAllConnections = username => async dispatch => {
  try {
    // setHeader();

    const res = await axios.get(`${ROOT_URL}/connection/${username}`);
    dispatch({
      type: GET_ALL_CONNECTIONS,
      payload: res.data
    });
  } catch (e) {
    return {
      type: GET_ALL_CONNECTIONS,
      payload: e
    };
  }
};

export const acceptConnection = data => async dispatch => {
  try {
    setHeader();
    const res = await axios.post(`${ROOT_URL}/connection/accept`, data);
    dispatch({
      type: ACCEPT_CONNECTION,
      payload: res.data
    });
  } catch (e) {
    return {
      type: ACCEPT_CONNECTION,
      payload: e
    };
  }
};
export const rejectConnection = data => async dispatch => {
  try {
    setHeader();
    const res = await axios.post(`${ROOT_URL}/connection/reject`, data);
    dispatch({
      type: REJECT_CONNECTION,
      payload: res.data
    });
  } catch (e) {
    return {
      type: REJECT_CONNECTION,
      payload: e
    };
  }
};

export function sendConnectionRequest(data, callback) {
  try {
    const request = axios
      .post(`${ROOT_URL}/connection`, data)
      .then(res => callback(res));

    return {
      type: SEND_CONNECTION_REQUEST,
      payload: request
    };
  } catch (e) {
    return {
      type: SEND_CONNECTION_REQUEST,
      payload: e
    };
  }
}
