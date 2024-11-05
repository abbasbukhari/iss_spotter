const needle = require('needle');

// Fetch IP Address
const fetchMyIP = function() {
  return needle('get', 'https://api.ipify.org?format=json')
    .then((response) => response.body.ip);
};

// Fetch Coordinates by IP Address
const fetchCoordsByIP = function(ip) {
  return needle('get', `https://ipwho.is/${ip}`)
    .then((response) => {
      const data = response.body;
      if (data.success === false) {
        throw new Error(`Success status was false. Server message says: ${data.message} when fetching for IP ${ip}`);
      }
      const { latitude, longitude } = data;
      return { latitude, longitude };
    });
};

// Fetch ISS Fly Over Times by Coordinates
const fetchISSFlyOverTimes = function(coords) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  return needle('get', url)
    .then((response) => {
      const data = response.body;
      if (!data.response) {
        throw new Error("Failed to retrieve flyover times");
      }
      return data.response;
    });
};

// Main function to chain all promises
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes);
};

module.exports = { nextISSTimesForMyLocation };
