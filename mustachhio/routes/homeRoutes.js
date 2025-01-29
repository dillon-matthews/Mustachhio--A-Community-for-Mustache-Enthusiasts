const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", async (req, res) => {
  try {
    homeController.getHome(req, res, {
      loggedIn: req.session.isAuthenticated,
      user: req.session.user || {},
      path: "/",
    });
  } catch (err) {
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/about", (req, res) => {
  homeController.getAbout(req, res, {
    loggedIn: req.session.isAuthenticated,
    user: req.session.user || {},
    path: "/about",
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    pageTitle: "Login",
    path: req.path,
    loggedIn: req.session.isAuthenticated,
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    pageTitle: "Register",
    path: req.path,
    loggedIn: req.session.isAuthenticated,
  });
});

module.exports = router;