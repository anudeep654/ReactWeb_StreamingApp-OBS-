import {
  SIGN_IN,
  SIGN_OUT,
  STREAM_CREATE,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from "./actionTypes";
import history from "../../history";
import StreamApi from "../../apis/streamApi";
export const signIn = id => {
  return {
    type: SIGN_IN,
    payload: id
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const CreateStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await StreamApi.post("/streams", {
    ...formValues,
    userId
  });
  dispatch({ type: STREAM_CREATE, payload: response.data });
  history.push("/");
};

export const fetchStreams = () => async (dispatch, getState) => {
  const response = await StreamApi.get("/streams");
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = id => async dispatch => {
  const response = await StreamApi.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;

  const response = await StreamApi.put(`/streams/${id}`, {
    ...formValues,
    userId
  });
  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/");
};

export const deleteStream = id => async dispatch => {
  await StreamApi.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
};
