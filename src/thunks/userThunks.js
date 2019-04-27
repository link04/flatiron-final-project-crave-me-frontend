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
  .then(parsedResponse => {
    if(parsedResponse.user){
      localStorage.setItem("token", parsedResponse.jwt)
      dispatch(createUser(parsedResponse.user))
    } else {
      dispatch(createUser({errors:parsedResponse.errors}))
    }
    });
}

export const getUser = (token) => (dispatch) => {
  return fetch(API_ROOT+"profile/", {
    method: 'GET',
    headers: {...HEADERS, Authorization: `${token}`}
  })
  .then(response => response.json())
  .then(parsedResponse => {
    dispatch(createUser(parsedResponse.user))
  })
}

export const loginUser = (userCredentials) => (dispatch) => {
  return fetch(API_ROOT+"login/", {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({user:userCredentials})
  })
  .then(response => response.json())
  .then(parsedResponse => {
    if(parsedResponse.user){
      localStorage.setItem("token", parsedResponse.jwt)
      dispatch(createUser(parsedResponse.user))
    } else {
      dispatch(createUser({errors:parsedResponse.errors}))
    }
  })
}
