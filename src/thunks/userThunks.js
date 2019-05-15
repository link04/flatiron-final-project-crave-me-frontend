import { API_ROOT, HEADERS, ATUTHORIZED_HEADERS } from '../constants/index.js';
import { createUser, updateUser, setUserMatches } from '../actions/userActions';
import { loadConversations } from '../actions/conversationActions';

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
      dispatch(createUser(parsedResponse.user, parsedResponse.jwt ))
    } else {
      dispatch(createUser({errors:parsedResponse.errors}))
    }
    });
}

export const getUser = (token) => (dispatch) => {
  return fetch(API_ROOT+"profile/", {
    method: 'GET',
    headers: {...HEADERS, 'Authorization': token}
  })
  .then(response => response.json())
  .then(parsedResponse => {
    dispatch(createUser(parsedResponse.user, parsedResponse.jwt))
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
      dispatch(createUser(parsedResponse.user, parsedResponse.jwt))
      dispatch(loadConversations(parsedResponse.user.id))
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

export const getUserMatches = (user_id, token) => (dispatch) => {
  return fetch(API_ROOT+"show_matches/"+ user_id, {
    headers: {...HEADERS, 'Authorization': token}
  })
  .then(response => response.json())
  .then(parsedResponse => {
      dispatch(setUserMatches(parsedResponse.active_matches))
  })
}

export const updateUserMatches = (matchedCraveId, matchedCraveData) => (dispatch) => {
  return fetch(API_ROOT+"matched_craves/"+ matchedCraveId, {
    method: 'PATCH',
    headers: {...HEADERS, 'Authorization': localStorage.token },
    body: JSON.stringify({matched_crave: matchedCraveData})
  })
  .then(response => response.json())
  .then(parsedResponse => {
      dispatch(setUserMatches(parsedResponse.active_matches))
  })
}

export const updateUserImage = (image, userId) => (dispatch) => {
  const userData = new FormData();
  Object.keys(image).forEach((key, value) => {
   userData.append(key, image[key])
  })
  return fetch(API_ROOT+"users/"+ userId, {
    method: 'PATCH',
    body: userData
  })
  .then(response => response.json())
  .then(parsedResponse => {
      dispatch(updateUser(parsedResponse.user))
  })
}
