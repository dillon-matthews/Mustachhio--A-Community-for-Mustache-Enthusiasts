const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

router.get("/api/styles", apiController.verifyToken, apiController.getStyles);
router.get("/api/token", apiController.getToken);

module.exports = router;