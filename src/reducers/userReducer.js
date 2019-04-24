
const initialUserState = {
  user:{}
};

const reducer = (userState = initialUserState, action) => {

  switch (action.type) {
    case 'CREATE_USER':
      return {...userState, user: action.payload}

    default:
    return userState
  }

}

export default reducer;
