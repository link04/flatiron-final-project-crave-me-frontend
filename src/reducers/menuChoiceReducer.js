
const initialMenuChoiceState = {
  menuChoices:[]
};

const reducer = (menuChoiceState = initialMenuChoiceState, action) => {

  switch (action.type) {
    case 'LOAD_MENU_CHOICES':
      return {...menuChoiceState, menuChoices: action.payload}
    default:
    return menuChoiceState
  }

}

export default reducer;
