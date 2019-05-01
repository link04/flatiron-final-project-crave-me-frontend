import { API_ROOT, ATUTHORIZED_HEADERS } from '../constants';
import { setCrave } from '../actions/craveActions';
import { setUserCrave } from '../actions/userActions';


export const postCrave = (craveData) => (dispatch) => {
  return fetch(API_ROOT+"craves/", {
       method: 'POST',
       headers: ATUTHORIZED_HEADERS,
       body: JSON.stringify({crave:craveData})
     })
  .then(response => response.json())
  .then(parsedResponse => {
    if(parsedResponse.crave){
      dispatch(setUserCrave(parsedResponse.crave))
    } else {
      parsedResponse.errors.forEach(error => {
        alert(error)
      })
    }
  });
}
