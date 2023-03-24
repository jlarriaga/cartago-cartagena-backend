const express = require("express");
const { createTripCtrl, getAllTrips, tripDetailsCtrl } = require("../controllers/trip.controller");
const router = express.Router();
const {isAuthenticated} = require("../middleware/jwt.middleware")


router.post("/create", isAuthenticated, createTripCtrl)
router.get("/all-trips",isAuthenticated, getAllTrips)
router.get("/:id",isAuthenticated ,tripDetailsCtrl)


module.exports = router;