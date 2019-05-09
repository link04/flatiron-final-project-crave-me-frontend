import { API_ROOT, ATUTHORIZED_HEADERS } from '../constants/index.js';
import { loadConversations } from '../actions/conversationActions';

export const getUserConversations = (userId) => (dispatch) => {
  return fetch(API_ROOT+"conversations/"+ userId, {
    headers: ATUTHORIZED_HEADERS
  })
  .then(response => response.json())
  .then(parsedResponse => {
      dispatch(loadConversations(parsedResponse))
  })
}

export const postMessage = (message) => () => {
  return fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: ATUTHORIZED_HEADERS,
      body: JSON.stringify({message: message})
    });
}
