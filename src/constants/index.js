export const API_ROOT = 'http://localhost:3000/api/v1/';
export const API_WS_ROOT = 'ws://localhost:3000/cable';
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const ATUTHORIZED_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Authorization': localStorage.token
};
