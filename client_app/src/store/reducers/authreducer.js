import { SIGN_IN, SIGN_OUT } from "../actions/actionTypes";

const initialState = {
  isSignedIn: null,
  userId: null
};
const authReducer = (state = { initialState }, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        userId: null
      };

    default:
      return state;
  }
};

export default authReducer;
