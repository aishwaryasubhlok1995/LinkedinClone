import { POSTED_APPLICATIONS, POSTED_JOBS } from "../actions/types";

const initialState = {
  posted_applications: [],
  posted_jobs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POSTED_APPLICATIONS:
      return {
        ...state,
        posted_applications: []
      };
    case POSTED_JOBS:
      return {
        ...state,
        posted_jobs: action.payload
      };
    default:
      return state;
  }
}
