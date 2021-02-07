import {
  BACKEND_URL, FLATS_URL, DEBUGGING, TESTING, TOKEN
} from '../AppConstants/AppConstants';

export const fetchGet = (url, params = null) => {
  let headers = {"Content-Type": "application/json"};
  if (TESTING) {
    headers["security-header"] = TOKEN;
  } 
  let finalUrl = url + ((params == null) ? '' : params);
  return fetch(finalUrl, {headers,});
}

export const fetchPut = (url, params = null) => {
  let headers = {"Content-Type": "application/json"};
  if (TESTING) {
    headers["security-header"] = TOKEN;
  } 
  return fetch(url, {method: "PUT", headers,});
}

export const fetchPost = (url) => {
  let headers = {"Content-Type": "application/json"};
  if (TESTING) {
    headers["security-header"] = TOKEN;
  } 
  return fetch(url, {method: "POST", headers,});
}

export const fetchDelete = (url) => {
  return fetch(url, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json', 
      'security-header': TOKEN
    }
  });
}


export const fetchPostWithFiles = (url, formData) => {
  let testHeaders = {
    "Content-Type": "multipart/form-data", 
    "security-header": TOKEN
  };
  return fetch(url, {
    method: 'POST', 
    headers: testHeaders, 
    body: formData
  });
}
