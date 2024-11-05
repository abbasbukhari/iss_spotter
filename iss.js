const needle = require('needle');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error)
 */
const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';
  
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
    callback(null, body.ip);
  });
};

/**
 * Makes a single API request to retrieve the latitude and longitude for a given IP address.
 * Input:
 *   - The IP address (string)
 *   - A callback (to pass back an error or the coordinates object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The latitude and longitude as an object (null if error):
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
const fetchCoordsByIP = function(ip, callback) {
  const url = `https://ipwho.is/${ip}`;
  
  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200 || !body.success) {
      const msg = `Error fetching coordinates for IP ${ip}. Message: ${body.message || 'Unknown error'}`;
      callback(Error(msg), null);
      return;
    }
    const coords = {
      latitude: body.latitude.toString(),
      longitude: body.longitude.toString()
    };
    callback(null, coords);
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS flyover times: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, body.response);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
