
const initialUserState = {
  user:{},
  loading:false
};

const reducer = (userState = initialUserState, action) => {
  switch (action.type) {
    case 'UPDATE_LOADING':
      return {...userState, loading: !userState.loading}
    case 'CREATE_USER':
      return {...userState, user: action.payload, loading: !userState.loading}
    case 'REMOVE_USER':
      return {...userState, user: {}}
    case 'SET_USER_CRAVE':
      return {...userState, user: {...userState.user, last_crave:action.payload}}
    case 'UPDATE_USER':
      return {...userState, user: {...userState.user, coordinate:action.payload}}
    default:
    return userState
  }
}

export default reducer;
