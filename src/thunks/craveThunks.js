import { API_ROOT, HEADERS  } from '../constants/index.js';
import { setUserCrave } from '../actions/userActions';

export const postCrave = (craveData) => (dispatch) => {
  // fixing error that token not working on ATUTHORIZED_HEADERS
  const headerCopy = { ...HEADERS, Authorization: localStorage.token }

  return fetch(API_ROOT+"craves/", {
       method: 'POST',
       headers: headerCopy,
       body: JSON.stringify({crave:craveData})
     })
  .then(response => response.json())
  .then(parsedResponse => {
    if(parsedResponse.crave){
      dispatch(setUserCrave(parsedResponse.crave, parsedResponse.active_matches))
    } else {
      parsedResponse.errors.forEach(error => {
        alert(error)
      })
    }
  });
}
