const express = require("express");
const router = express.Router();
const {getAllPropertiesCtrl, createPropertiesCtrl, findAvailablePropertiesCtrl, getPropertybyIdCtrl } = require("../controllers/property.controller")
const {isAuthenticated} = require("../middleware/jwt.middleware")

router.get("/all-properties", getAllPropertiesCtrl)
router.post("/create",isAuthenticated, createPropertiesCtrl)
router.post("/available-properties", isAuthenticated, findAvailablePropertiesCtrl)
router.get("/:id",isAuthenticated, getPropertybyIdCtrl)




module.exports = router;