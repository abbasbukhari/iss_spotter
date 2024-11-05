const { nextISSTimesForMyLocation } = require('./iss_promised');

// Helper function to format and print pass times
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(pass.risetime * 1000);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

// Run the main function and handle responses
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
