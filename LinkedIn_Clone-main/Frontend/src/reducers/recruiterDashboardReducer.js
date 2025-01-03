import {
  RECRUITER_DASHBOARD_TOP10,
  RECRUITER_DASHBOARD_TOP5,
  GET_RECRUITER_JOBS,
  RECRUITER_DASHBOARD_CITY,
  RECRUITER_DASHBOARD_JOB_CLICKS,
  RECRUITER_NUM_SAVED_JOB,
  RECRUITER_TRACE_JOB
} from "../actions/types";

const initialState = {
  data_top10: [],
  data_top5: [],
  recruiter_jobs: [],
  data_city: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECRUITER_DASHBOARD_TOP10:
      return {
        ...state,
        data_top10: action.payload
      };

    case RECRUITER_DASHBOARD_TOP5:
      return {
        ...state,
        data_top5: action.payload
      };

    case GET_RECRUITER_JOBS:
      return {
        ...state,
        recruiter_jobs: action.payload
      };

    case RECRUITER_DASHBOARD_CITY:
      return {
        ...state,
        data_city: action.payload
      };

    case RECRUITER_DASHBOARD_JOB_CLICKS:
      return {
        ...state,
        data_jobclicks: action.payload
      };
    case RECRUITER_NUM_SAVED_JOB:
      return {
        ...state,
        data_jobsaves: action.payload
      };
    case RECRUITER_TRACE_JOB:
      return {
        ...state,
        data_tracejob: action.payload
      };
    default:
      return state;
  }
}
