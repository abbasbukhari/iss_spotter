// iss.js
const needle = require("needle");

const fetchMyIP = function(callback) {
  const url = "https://api.ipify.org?format=json"; // IPify API endpoint

  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = body.ip;
    callback(null, ip); // Pass the IP address as the second argument if all is well
  });
};

module.exports = { fetchMyIP };
