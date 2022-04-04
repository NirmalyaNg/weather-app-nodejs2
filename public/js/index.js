const addressElement = document.getElementById("address");
const currTempValue = document.getElementById("currTempValue");
const feelslikeTempValue = document.getElementById("feelslikeTempValue");
const weatherDescription = document.getElementById("weather_description");
const weatherForm = document.getElementById("weatherForm");
const addressInput = document.getElementById("addressInput");
const loadingSpinner = document.getElementById("spinner");
const weatherData = document.getElementById("weatherData");
const errorMessage = document.getElementById("errorMessage");
const weatherIcon = document.getElementById("weatherIcon");

const startLoading = () => {
  loadingSpinner.style.display = "block";
  weatherData.style.display = "none";
};

const stopLoading = () => {
  loadingSpinner.style.display = "none";
  weatherData.style.display = "block";
};

const handleError = (message) => {
  // errorMessage.style.display = "block";
  // errorMessage.textContent = message;
  alert(message);
};

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const address = addressInput.value.trim();
  startLoading();

  fetch(`http://localhost:3000/forecast?address=${address}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }

      const { temperature, description, feelslike, location, icon } = data;
      console.log(icon);
      currTempValue.textContent = `${temperature} °C`;
      feelslikeTempValue.textContent = `${feelslike} °C`;
      weatherDescription.textContent = description;
      addressElement.textContent = location;
      weatherIcon.src = icon;

      stopLoading();
      addressInput.value = "";
    })
    .catch((error) => {
      loadingSpinner.style.display = "none";
      handleError(error.message);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  weatherData.style.display = "none";
  loadingSpinner.style.display = "none";
  errorMessage.style.display = "none";
});
