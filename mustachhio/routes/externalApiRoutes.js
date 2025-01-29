const express = require('express');
const router = express.Router();
const externalApiController = require('../controllers/externalApiController');

router.get('/external-api', (req, res) => {
    externalApiController.getWeatherData(req, res, {
      loggedIn: req.session.isAuthenticated,
      user: req.session.user || {},
      path: "/external-api",
    });
  });

module.exports = router;