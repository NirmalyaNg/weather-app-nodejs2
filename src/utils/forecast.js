const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const forecastUrl = `http://api.weatherstack.com/current?access_key=9557cbd020b898034be65ca32c0c4061&query=${latitude},${longitude}`;

  request({ url: forecastUrl, json: true }, (error, response) => {
    if (error) {
      return callback("Unable to connect to weather services", undefined);
    } else if (response.body.error) {
      return callback(
        "Please provide valid adddress to fetch the weather",
        undefined
      );
    } else {
      const weatherData = response.body.current;
      const temperature = weatherData.temperature;
      const feelslike = weatherData.feelslike;
      const description = weatherData.weather_descriptions[0];
      const icon = weatherData.weather_icons[0];

      return callback(undefined, {
        temperature,
        feelslike,
        description,
        icon,
      });
    }
  });
};

module.exports = forecast;
