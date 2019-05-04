import { API_ROOT, HEADERS, ATUTHORIZED_HEADERS } from '../constants/index.js';
import { loadConversations, updateConversations, updateConversationMessages } from '../actions/conversationActions';

export const getUserConversations = (userId) => (dispatch) => {
  return fetch(API_ROOT+"conversations/"+ userId, {
    headers: ATUTHORIZED_HEADERS
  })
  .then(response => response.json())
  .then(parsedResponse => {
      dispatch(loadConversations(parsedResponse))
  })
}

// export const getUserConversations = (userId) => (dispatch) => {
//   return fetch(API_ROOT+"conversations/"+ userId, {
//     headers: ATUTHORIZED_HEADERS
//   })
//   .then(response => response.json())
//   .then(parsedResponse => {
//       dispatch(loadConversations(parsedResponse))
//   })
// }
//
// export const getUserConversations = (userId) => (dispatch) => {
//   return fetch(API_ROOT+"conversations/"+ userId, {
//     headers: ATUTHORIZED_HEADERS
//   })
//   .then(response => response.json())
//   .then(parsedResponse => {
//       dispatch(loadConversations(parsedResponse))
//   })
// }
