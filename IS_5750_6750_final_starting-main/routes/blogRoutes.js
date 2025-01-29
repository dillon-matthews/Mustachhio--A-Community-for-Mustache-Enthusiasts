const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/", (req, res) => {
  blogController.getBlogs(req, res, {
    loggedIn: req.session.isAuthenticated,
    user: req.session.user || {},
    path: "/blog",
  });
});

router.get("/:titleSlug", (req, res) => {
  blogController.getSingleBlog(req, res, {
    loggedIn: req.session.isAuthenticated,
    user: req.session.user || {},
    path: `/blog/${req.params.titleSlug}`,
  });
});

module.exports = router;