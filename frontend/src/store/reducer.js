import { 
  LOGOUT_REQUESTED
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
  status: ''
};

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case LOGOUT_REQUESTED: {
      return {
        ...defaultState,
        jwtError: action.jwtError || false
      };
    }
    case 'SOME_ACTION':
      return {
        ...state,
        someProp: []
      };
    case 'ANOTHER_ACTION':
      return {
        ...state,
        anotherProp: '' + action.actionPayload
      };
    default:
      return state;
  }
};

export default reducer;