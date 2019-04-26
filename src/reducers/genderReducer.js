
const initialGenderState = {
  genders:[]
};

const reducer = (genderState = initialGenderState, action) => {

  switch (action.type) {
    case 'LOAD_GENDERS':
      return {...genderState, genders: action.payload}
    default:
    return genderState
  }

}

export default reducer;
