
const initialUserState = {
  user:{},
  loading:false,
  user_token: ''
};

const reducer = (userState = initialUserState, action) => {
  switch (action.type) {
    case 'UPDATE_LOADING':
      return {...userState, loading: !userState.loading}
    case 'CREATE_USER':
      return {...userState, user: action.payload.user, user_token: action.payload.user_token}
    case 'REMOVE_USER':
      return {...userState, user: {}}
    case 'SET_USER_CRAVE':
      return {...userState, user: {...userState.user, last_crave:action.payload.crave, active_matches:action.payload.matches}}
    case 'SET_USER_MATCHES':
      return {...userState, user: {...userState.user, active_matches:action.payload}}
    case 'UPDATE_USER':
      return {...userState, user: action.payload}
    default:
    return userState
  }
}

export default reducer;
