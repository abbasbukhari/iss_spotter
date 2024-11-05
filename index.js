// index.js

const { fetchCoordsByIP } = require('./iss');

// Temporary IP address for testing purposes
const ip = "162.245.144.188";

fetchCoordsByIP(ip, (error, coordinates) => {
  if (error) {
    console.log("It didn't work! Error:", error);
  } else {
    console.log('It worked! Returned coordinates:', coordinates);
  }
});
