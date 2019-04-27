
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
    default:
    return userState
  }

}

export default reducer;
