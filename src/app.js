const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirectoryPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "This is the About Page",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "This is the Help Page",
  });
});

app.get("/forecast", (req, res) => {
  const address = req.query["address"];

  if (!address) {
    return res.send({
      error: "Please provide an address to get weather details",
    });
  }

  geocode(address, (error, { latitude, longitude, location }) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }

      return res.send({ ...forecastData, location });
    });
  });
});

app.get("/weatherPage", (req, res) => {
  res.render("weather");
});

app.get("/about/*", (req, res) => {
  res.render("404", {
    title: "About Article Not Found !!!",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help Article Not Found !!!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 NOT FOUND !!!",
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
