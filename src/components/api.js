import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://hbr26fk6lf.execute-api.eu-central-1.amazonaws.com',
  headers: { 'Content-Type': 'application/json' }
});

export const handleError = error => {
  const response = error.response;

  // catch 4xx and 5xx status codes
  if (response && !!`${response.status}`.match(/^[4|5]\d{2}$/)) {
    let info = `\nrequest to: ${response.request.responseURL}`;

    if (response.data.status) {
      info += `\nstatus code: ${response.data.status}`;
      info += `\nerror: ${response.data.error}`;
      info += `\nerror message: ${response.data.message}`;
    } else {
      info += `\nstatus code: ${response.status}`;
      info += `\nerror message:\n${response.data}`;
    }

    console.log('The request was made and answered but was unsuccessful.', error.response);
    return info;
  } else {
    if (error.message.match(/Network Error/)) {
      alert('The server cannot be reached.\nDid you start it?');
    }

    console.log('Something else happened.', error);
    return error.message;
  }
};

export const getErrorMessage = error => {
  var errorMsg = null;
  if(error.response && error.response.data && error.response.data.message) {
      errorMsg = error.response.data.message
  } else {
      errorMsg = "Uups... there was a server error!"
  }
  return errorMsg;
}