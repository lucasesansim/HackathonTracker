// within src/store/reducer.js
const initialState = {
  someProp: [],
  anotherProp: ''
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
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