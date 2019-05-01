import { API_ROOT, HEADERS, ATUTHORIZED_HEADERS } from '../constants';
import { createUser, updateUser } from '../actions/userActions';

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

export const coordinateUser = (userCoordinates, user_id) => (dispatch) => {
  return fetch(API_ROOT+"update_coordinates/"+ user_id, {
    method: 'PATCH',
    headers: ATUTHORIZED_HEADERS,
    body: JSON.stringify(userCoordinates)
  })
  .then(response => response.json())
  .then(parsedResponse => {
      dispatch(updateUser(parsedResponse.user))
  })
}
