import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import applicantReducer from "./applicantReducer";
import recruiterDashboardReducer from "./recruiterDashboardReducer";
import getProfileViewsReducer from "./profileViewsReducer";
import recruiterReducer from "./recruiterReducer";
import jobReducer from "./jobReducer";
import connectionsReducer from "./connectionsReducer";

export default combineReducers({
  applicantLogin: applicantReducer,
  form: formReducer,
  recruiterDashboard: recruiterDashboardReducer,
  getProfileViewsReducer: getProfileViewsReducer,
  recruiterReducer: recruiterReducer,
  jobReducer: jobReducer,
  connections: connectionsReducer
});
