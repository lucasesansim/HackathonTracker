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
  HACKATHONS_RETRIEVED,
  TOP_DEVELOPERS_REQUESTED,
  TOP_DEVELOPERS_RETRIEVED,
  TOP_DEVELOPERS_ERRORED,
  HACKATHON_REQUESTED,
  HACKATHON_RETRIEVED,
  HACKATHON_ERRORED,
  REGISTER_REQUESTED,
  REGISTER_SUCCESSFUL,
  REGISTER_FAILED
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

export const register = (newUser) => {
  const registerRequested = () => ({
    type: REGISTER_REQUESTED
  });

  const registerSuccessful = response => {
    const { token, user } = response.data;
    return {
      type: REGISTER_SUCCESSFUL,
      token,
      user
    } 
  };

  const registerFailed = error => ({
    type: REGISTER_FAILED,
    error
  });

  return dispatch => {
    dispatch(registerRequested());

    return ActionsClient.register(newUser)
      .then(response => {
          dispatch(registerSuccessful(response));
      })
      .catch(err => {
        dispatch(registerFailed(err.response));
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

    return ActionsClient.listHackathons(page, pageSize)
      .then(response => {
          dispatch(hackathonsRetrieved(response));
      })
      .catch(err => {
        dispatch(hackathonsFailed(err.response));
      });
  };
};

export const getTopDevelopers = () => {
  const topDevelopersRequested = () => ({
    type: TOP_DEVELOPERS_REQUESTED
  });

  const topDevelopersRetrieved = response => ({
    type: TOP_DEVELOPERS_RETRIEVED,
    topDevelopers: response.data
  });

  const topDevelopersErrored = error => ({
    type: TOP_DEVELOPERS_ERRORED,
    error
  });

  return dispatch => {
    dispatch(topDevelopersRequested());

    return ActionsClient.listTopDevelopers()
      .then(response => {
          dispatch(topDevelopersRetrieved(response));
      })
      .catch(err => {
        dispatch(topDevelopersErrored(err.response));
      });
  };
};

export const getHackathon = id => {
  const hackathonRequested = () => ({
    type: HACKATHON_REQUESTED
  });

  const hackathonRetrieved = response => ({
    type: HACKATHON_RETRIEVED,
    hackathon: response.data
  });

  const hackathonErrored = error => ({
    type: HACKATHON_ERRORED,
    error
  });

  return dispatch => {
    dispatch(hackathonRequested());

    return ActionsClient.getHackathon(id)
      .then(response => {
          dispatch(hackathonRetrieved(response));
      })
      .catch(err => {
        dispatch(hackathonErrored(err.response));
      });
  };
};