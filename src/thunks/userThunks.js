import { API_ROOT,HEADERS } from '../constants';
import { createUser } from '../actions/userActions';

export const postUser = (user) => (dispatch) => {

  const userData = new FormData();

  Object.keys(user).forEach((key, value) => {
   userData.append(key, user[key])
  })

  return fetch(API_ROOT+"users/", {
       method: 'POST',
       body: userData
     })
  .then(response => response.json())
  .then(parsedResponse => dispatch(createUser(parsedResponse)))
}

export const getUser = (user_id) => (dispatch) => {

  return fetch(API_ROOT+"users/"+user_id)
  .then(response => response.json())
  .then(parsedResponse => dispatch(createUser(parsedResponse)))
}
