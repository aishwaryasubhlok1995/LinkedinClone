import {
  SEARCH_JOB,
  POST_A_JOB,
  EDIT_JOB,
  GET_JOB_BY_ID,
  GET_SAVED_JOB,
  GET_APPLIED_JOB,
  VIEW_JOB_APPLICATIONS
} from "../actions/types";

const initialState = {
  search_job_results: [],
  view: [],
  newJob: [],
  job_edit: [],
  savejob: [],
  appliedjob: [],
  jobApplications: []
};

export default function(state = initialState, action) {
  console.log("actionpayload", action.payload);
  switch (action.type) {
    case SEARCH_JOB:
      return {
        ...state,
        search_job_results: action.payload.updatedList,
        view: action.payload.updatedList[0]
      };
    case POST_A_JOB:
      return {
        ...state,
        newJob: action.payload
      };
    case EDIT_JOB:
      return {
        ...state,
        newJob: action.payload
      };
    case GET_JOB_BY_ID:
      return {
        ...state,
        job_edit: action.payload
      };
    case GET_SAVED_JOB:
      return {
        ...state,
        savejob: action.payload.savedjobs
      };
    case GET_APPLIED_JOB:
      return {
        ...state,
        appliedjob: action.payload.appliedjobs
      };
    case VIEW_JOB_APPLICATIONS:
      console.log("payload=", action.payload);
      return {
        ...state,
        jobApplications: action.payload
      };

    default:
      return state;
  }
}
