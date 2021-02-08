import {
  BACKEND_URL, FLATS_URL, DEBUGGING, TESTING, TOKEN
} from '../AppConstants/AppConstants';

function getHeader(requestType) {
  let headers = {"Content-Type": requestType};
  if (TESTING) {
    headers["security-header"] = TOKEN;
  }
  return headers;
}

export const fetchGet = (url, params = null) => {
  let finalUrl = url + ((params == null) ? '' : params);
  return fetch(finalUrl, {headers: getHeader("application/json")});
}

export const fetchPut = (url) => {
  return fetch(url, {method: "PUT", headers: getHeader("multipart/form-data")});
}

export const fetchPost = (url) => {
  return fetch(url, {method: "POST", headers: getHeader("application/json")});
}

export const fetchDelete = (url) => {
  return fetch(url, {method: "DELETE", headers: getHeader("application/json")});
}


export const fetchPostWithFiles = (url, formData) => {
  return fetch(url, {
    method: 'POST', 
    headers: {
      "security-header": TOKEN
    },
    body: formData
  });
}
