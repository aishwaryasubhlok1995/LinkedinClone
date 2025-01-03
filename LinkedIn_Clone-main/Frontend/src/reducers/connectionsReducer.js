import {
  GET_ALL_CONNECTIONS,
  ACCEPT_CONNECTION,
  REJECT_CONNECTION,
  SEND_CONNECTION_REQUEST
} from "../actions/types";

const initialState = {
  allConnections: [],
  acceptConnection: [],
  rejectConnection: [],
  newConnection: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CONNECTIONS:
      console.log("payload=", action.payload);
      return {
        ...state,
        allConnections: action.payload
      };
    case ACCEPT_CONNECTION:
      return {
        ...state,
        acceptConnection: action.payload
      };
    case REJECT_CONNECTION:
      return {
        ...state,
        rejectConnection: action.payload
      };
    case SEND_CONNECTION_REQUEST:
      return {
        ...state,
        newConnection: action.payload
      };

    default:
      return state;
  }
}
