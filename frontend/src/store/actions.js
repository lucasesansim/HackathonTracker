import ActionsClient from "../http/ActionsClient";
import { 
  LOGIN_REQUESTED,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  LOGOUT_REQUESTED,
  LOGOUT_SUCCESSFUL,
  LOGOUT_FAILED,
  HACKATHONS_REQUESTED,
  HACKATHONS_ERRORED,
  HACKATHONS_RETRIEVED
} from "./types";

export const login = (user) => {
  const loginRequested = () => ({
    type: LOGIN_REQUESTED
  });

  const loginSuccessful = response => {
    const { token, user } = response.data;
    return {
      type: LOGIN_SUCCESSFUL,
      token,
      user
    };
  };

  const loginFailed = error => ({
    type: LOGIN_FAILED,
    error
  });

  return async (dispatch) => {
    dispatch(loginRequested());

    try {
      const response = await ActionsClient.login(user);
      dispatch(loginSuccessful(response));
    } catch (err) {
      dispatch(loginFailed(err.response));
    }
  };
};

// TODO: Should include if there was jwt error
export const logout = () => {
  const logoutRequested = () => ({
    type: LOGOUT_REQUESTED
  });

  const logoutSuccessful = () => ({
    type: LOGOUT_SUCCESSFUL
  });

  const logoutFailed = error => ({
    type: LOGOUT_FAILED,
    error
  });

  return dispatch => {
    dispatch(logoutRequested());

    return ActionsClient.logout()
      .then(() => {
          dispatch(logoutSuccessful());
      })
      .catch(err => {
        dispatch(logoutFailed(err.response));
      });
  };
};

export const getHackathons = (page, pageSize) => {
  const hackathonsRequested = () => ({
    type: HACKATHONS_REQUESTED
  });

  const hackathonsRetrieved = response => ({
    type: HACKATHONS_RETRIEVED,
    hackathons: response.data
  });

  const hackathonsFailed = error => ({
    type: HACKATHONS_ERRORED,
    error
  });

  return dispatch => {
    dispatch(hackathonsRequested());

    // TODO: change to list
    return ActionsClient.getHackathon(page, pageSize)
      .then(response => {
          dispatch(hackathonsRetrieved(response));
      })
      .catch(err => {
        dispatch(hackathonsFailed(err.response));
      });
  };
};