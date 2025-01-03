import { PROFILE_VIEWS } from "../actions/types";

const initialState = {
  data_profileviews: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_VIEWS:
      return {
        ...state,
        data_profileviews: action.payload
      };

    default:
      return state;
  }
}
