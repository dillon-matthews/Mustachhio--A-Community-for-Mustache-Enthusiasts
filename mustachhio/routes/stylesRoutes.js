const express = require("express");
const router = express.Router();
const stylesController = require("../controllers/stylesController");
const fileUpload = require("express-fileupload");
const adminMiddleware = require("../middleware/adminMiddleware");

router.use(fileUpload());

router.get("/new", adminMiddleware, (req, res) => {
  res.render("new-style", {
    pageTitle: "New Style",
    path: "/styles/new",
    loggedIn: req.session.isAuthenticated,
    user: req.session.user || {},
  });
});

router.post("/new", stylesController.createStyle);

router.get("/", (req, res) => {
  stylesController.getStyles(req, res, {
    loggedIn: req.session.isAuthenticated,
    user: req.session.user || {},
    path: "/styles",
  });
});

router.get("/:styleSlug", (req, res) => {
  stylesController.getSingleStyle(req, res, {
    loggedIn: req.session.isAuthenticated,
    user: req.session.user || {},
    path: `/styles/${req.params.styleSlug}`,
  });
});

module.exports = router;