// iss.js

const needle = require('needle');

// fetchCoordsByIP function
const fetchCoordsByIP = (ip, callback) => {
  const url = `https://ipwho.is/${ip}`;
  
  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (body.success === false) {
      const msg = `Success status was false. Server message says: ${body.message} when fetching for IP ${ip}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = body;
    callback(null, { latitude, longitude });
  });
};

// Export the functions
module.exports = { fetchCoordsByIP };
