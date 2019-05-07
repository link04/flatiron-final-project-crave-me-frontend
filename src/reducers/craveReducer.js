
const initialCraveState = {
  crave:{}
};

const reducer = (craveState = initialCraveState, action) => {

  switch (action.type) {
    case 'SET_CRAVE':
      return {...craveState, crave: action.payload}
    case 'REMOVE_CRAVE':
      return {...craveState, user: {}}
    default:
    return craveState
  }

}

export default reducer;
