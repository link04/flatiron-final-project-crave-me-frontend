import { API_ROOT, ATUTHORIZED_HEADERS } from '../constants';
import { setCrave } from '../actions/craveActions';

export const postCrave = (craveData) => (dispatch) => {
  return fetch(API_ROOT+"craves/", {
       method: 'POST',
       headers: ATUTHORIZED_HEADERS,
       body: JSON.stringify({crave:craveData})
     })
  .then(response => response.json())
  .then(parsedResponse => {
    if(parsedResponse.crave){
      dispatch(setCrave(parsedResponse.crave))
    } else {
      parsedResponse.errors.forEach(error => {
        alert(error)
      })
    }
  });
}
