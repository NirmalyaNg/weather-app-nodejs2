const request = require("postman-request");

const geocode = (address, callback) => {
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibmlybWFseWFuZ2dnIiwiYSI6ImNrb2Zranl0dzBnMzIzMGxhaXExdzBmazUifQ.L5UycGrnkpa209Meqds4NA&limit=1`;
  request(
    {
      url: geocodeUrl,
      json: true,
    },
    (error, response) => {
      if (error) {
        return callback("Unable to connect to weather services", undefined);
      } else if (response.body.features.length === 0) {
        return callback("Please provide a valid address", undefined);
      } else {
        const latitude = response.body.features[0].center[1];
        const longitude = response.body.features[0].center[0];
        const location = response.body.features[0].place_name;

        return callback(undefined, {
          latitude,
          longitude,
          location,
        });
      }
    }
  );
};

module.exports = geocode;
