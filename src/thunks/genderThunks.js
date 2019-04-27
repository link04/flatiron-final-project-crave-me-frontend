import { API_ROOT } from '../constants';
import { loadGenders } from '../actions/genderActions';

export const getGenders = () => (dispatch) => {
  return fetch(API_ROOT+"genders/")
  .then(response => response.json())
  .then(parsedResponse => dispatch(loadGenders(parsedResponse)))
}
