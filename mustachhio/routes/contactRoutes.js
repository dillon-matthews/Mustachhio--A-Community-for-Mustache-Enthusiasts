const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const adminMiddleware = require('../middleware/adminMiddleware');
const path = require("path");

router.get("/new", (req, res) => {
  contactController.getContact(req, res, {
    loggedIn: req.session.isAuthenticated,
    user: req.session.user || {},
    path: "/contacts/new",
  });
});

router.post("/create", (req, res) => {
  contactController.createContact(req, res, {
    loggedIn: req.session.isAuthenticated,
    user: req.session.user || {},
  });
});

router.post("/:id/update", adminMiddleware, (req, res) => {
  contactController.editContact(req, res, {
    loggedIn: req.session.isAuthenticated,
    user: req.session.user || {},
  });
});

router.get("/:id/edit", adminMiddleware, (req, res) => {
  contactController.getEditContact(req, res, {
    loggedIn: req.session.isAuthenticated,
    user: req.session.user || {},
    path: `/contacts/${req.params.id}/edit`,
  });
});

router.get("/", adminMiddleware, (req, res) => {
  contactController.getContactList(req, res, {
    loggedIn: req.session.isAuthenticated,
    user: req.session.user || {},
    path: "/contacts",
  });
});

module.exports = router;