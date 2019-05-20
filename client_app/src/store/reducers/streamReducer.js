import {
  FETCH_STREAM,
  FETCH_STREAMS,
  STREAM_CREATE,
  EDIT_STREAM,
  DELETE_STREAM
} from "../actions/actionTypes";
import _ from "lodash";

const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      return {
        ...state,
        ..._.mapKeys(action.payload, "id")
      };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload }; //this is what creating object instead of array
    // return [...state, action.payload];

    case STREAM_CREATE:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default streamReducer;
