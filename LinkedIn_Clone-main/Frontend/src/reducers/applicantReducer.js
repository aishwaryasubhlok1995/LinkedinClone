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
} from "../actions/types";

const initialState = {
  authFlag: false,
  username: "",
  location: false,
  details: false,
  inserted: false,
  summaryinserted: false,
  schoolinserted: false,
  skillsinserted: false,
  experienceinserted: false,
  getuserdata: false,
  userdata: [],
  signupschool: false,
  url: "",
  resume: "",
  searchResults: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case APPLICANT_LOGIN:
      return {
        ...state,
        token: action.payload
      };
    case APPLICANT_SUMMARYINSERT_DATA:
      return {
        ...state,
        summaryinserted: true
      };
    case APPLICANT_GETUSER_DATA:
      console.log("payload data", action.payload);
      return {
        ...state,
        userdata: action.payload[0],
        getuserdata: true
      };

    case APPLICANT_SKILLSINSERT_DATA:
      return {
        ...state,
        skillsinserted: true
      };

    case APPLICANT_SCHOOLINSERT_DATA:
      return {
        ...state,
        schoolinserted: true
      };

    case APPLICANT_EXPERIENCEINSERT_DATA:
      return {
        ...state,
        experienceinserted: true
      };

    case APPLICANT_LOCATION_DATA:
      return {
        ...state,
        location: true
      };

    case APPLICANT_DETAILS:
      return {
        ...state,
        details: true
      };

    case SIGNUPSCHOOL:
      return {
        ...state,
        signupschool: true
      };

    case APPLICANT_SIGNUP:
      return {
        ...state,
        username: action.payload
      };
    case ADD_PROFILE_PICTURE:
      return {
        ...state,
        url: action.payload
      };
    case ADD_USER_RESUME:
      return {
        ...state,
        resume: action.payload
      };
    case SEARCH_USER_BY_NAME:
      return {
        ...state,
        searchResults: action.payload
      };

    default:
      return state;
  }
}
