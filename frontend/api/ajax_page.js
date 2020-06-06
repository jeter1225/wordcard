// import mock from "./mock";
// const devMode = process.env.NODE_ENV === "development";

const real = {
  register: register => {
    return window
      .fetch('http://localhost:3002/api/register', {
        body: JSON.stringify(register), // must match 'Content-Type' header
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
      })
      .then(response => response.json());
  },
  login: login => {
    return window
      .fetch('http://localhost:3002/api/login', {
        body: JSON.stringify(login), // must match 'Content-Type' header
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
      })
      .then(response => response.json());
  },
};
export default real;
// export default devMode ? mock : real;
