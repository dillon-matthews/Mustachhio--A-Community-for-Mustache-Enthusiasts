const axios = require("axios");

exports.getWeatherData = async (req, res) => {
  try {
    const apiKey = "API_KEY";
    const city = "Logan";
    const state = "Utah";
    const country = "US";
    const units = "M";

    const url = `https://api.weatherbit.io/v2.0/current?city=${city}&state=${state}&country=${country}&units=${units}&key=${apiKey}`;

    const response = await axios.get(url);
    const weatherData = response.data;

    res.render("external-api", {
      pageTitle: "External API",
      weatherData: weatherData.data[0],
      path: "/external-api",
      loggedIn: req.session.isAuthenticated,
      user: req.session.user || {},
    });
  } catch (error) {
    console.error(error);
    res
      .status(429)
      .send(
        "Error fetching weather data, this is likely due to API rate limiting. Please try again later."
      );
  }
};
