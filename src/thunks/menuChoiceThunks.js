import { API_ROOT } from '../constants';
import { loadMenuChoices } from '../actions/menuChoiceActions';

export const getMenuChoices = () => (dispatch) => {
  return fetch(API_ROOT+"menu_choices/", {
    headers: {Authorization: `${localStorage.token}`}
  })
  .then(response => response.json())
  .then(parsedResponse => dispatch(loadMenuChoices(parsedResponse)))
}
