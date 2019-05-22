import { API_ROOT, ATUTHORIZED_HEADERS, HEADERS } from '../constants/index.js';
import { loadConversations, deleteConversation } from '../actions/conversationActions';

export const getUserConversations = (userId) => (dispatch) => {
  return fetch(API_ROOT+"conversations/"+ userId, {
    headers: ATUTHORIZED_HEADERS
  })
  .then(response => response.json())
  .then(parsedResponse => {
      dispatch(loadConversations(parsedResponse))
  })
}

export const postMessage = (message) => (dispatch) => {
  return fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: ATUTHORIZED_HEADERS,
      body: JSON.stringify({message: message})
    })
    .then(response => {
      if(response.status !== 200){
        return response.json()
      } else {
        return true;
      }
    })
    .then(parsedResponse => {
      if(parsedResponse !== true){
        dispatch(deleteConversation(parsedResponse))
      }
    })
}

export const destroyConversation = (conversationId, userToken) => (dispatch) => {
  return fetch(API_ROOT+"/conversations/"+conversationId, {
    method: 'DELETE',
    headers: {...HEADERS, 'Authorization': userToken},
  })
  .then(response => response.json())
  .then(parsedResponse => {
    dispatch(deleteConversation(parsedResponse))
  })
}
