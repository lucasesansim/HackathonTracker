import { 
  HACKATHONS_ERRORED,
  HACKATHONS_REQUESTED,
  HACKATHONS_RETRIEVED,
  HACKATHON_ERRORED,
  HACKATHON_REQUESTED,
  HACKATHON_RETRIEVED,
  LOGIN_FAILED,
  LOGIN_REQUESTED,
  LOGIN_SUCCESSFUL,
  LOGOUT_FAILED,
  LOGOUT_REQUESTED,
  LOGOUT_SUCCESSFUL,
  REGISTER_FAILED,
  REGISTER_REQUESTED,
  TOP_DEVELOPERS_ERRORED,
  TOP_DEVELOPERS_REQUESTED,
  TOP_DEVELOPERS_RETRIEVED,

} from "./types";

/* In a more extense and complex application, I'd split the reducer into multiple, 
 * more managable reducers according to the variables they manage, 
 * in a new folder for each: i.e.: reducers/auth.js, reducers/hackathons.js */
const defaultState = {
  auth: {
    token: null,
    isLoggedIn: false,
    user: {},
    jwtError: false
  },
  hackathons: {
    hackathons: [],
    hackathon: {}
  },
  developers: {
    topDevelopers: []
  },
  status: '',
  error: {}
};

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case LOGIN_REQUESTED:
    case REGISTER_REQUESTED:
    case LOGOUT_REQUESTED: 
    case HACKATHONS_REQUESTED: 
    case HACKATHON_REQUESTED:
    case TOP_DEVELOPERS_REQUESTED: {
      return {
        ...state,
        status: action.type
      };
    }


    case LOGIN_SUCCESSFUL: {
      return {
        ...state,
        status: action.type,
        auth: {
          ...state.auth,
          token: action.token,
          user: action.user,
          isLoggedIn: true
        } 
      };
    }
    case LOGOUT_SUCCESSFUL: {
      return {
        ...state,
        status: action.type,
        auth: {
          ...state.auth,
          jwtError: action.jwtError || false
        } 
      };
    }
    case HACKATHONS_RETRIEVED: {
      return {
        ...state,
        status: action.type,
        hackathons: {
          ...state.hackathons,
          hackathons: action.hackathons
        }
      };
    }
    case HACKATHON_RETRIEVED: {
      return {
        ...state,
        status: action.type,
        hackathons: {
          ...state.hackathons,
          hackathon: action.hackathon
        }
      };
    }
    case TOP_DEVELOPERS_RETRIEVED: {
      return {
        ...state,
        status: action.type,
        developers: {
          ...state.developers,
          topDevelopers: action.topDevelopers
        }
      };
    }

    case LOGIN_FAILED:
    case REGISTER_FAILED:
    case LOGOUT_FAILED: 
    case HACKATHONS_ERRORED: 
    case HACKATHON_ERRORED:
    case TOP_DEVELOPERS_ERRORED: {
      return {
        ...state,
        status: action.type,
        error: action.error
      };
    }
    default:
      return state;
  }
};

export default reducer;