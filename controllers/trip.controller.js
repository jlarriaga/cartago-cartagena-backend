const mongoose = require("mongoose");
const Trip = require("../models/Trip.model");
const Property = require("../models/Property.model");
const Customer = require("../models/Customer.model");

exports.createTripCtrl = async (req, res, next) => {
  const { checkInDate, checkOutDate, numOfTravelers, fullName, email, properties } =
    req.body;
  console.log(checkInDate, checkOutDate, numOfTravelers, fullName, email);
  try {

    const createdCustomer = await Customer.create({fullName, email})
    console.log("Se creo el customer", createdCustomer);

    const createdTrip = await Trip.create({
      checkInDate,
      checkOutDate,
      numOfTravelers,
      _properties: properties,
      _customer: createdCustomer,
    });

    res.status(201).json({ message: "Trip created successfully", createdTrip });
  } catch (error) {
    console.error("Error in createTripCtrl:", error);
    res
      .status(400)
      .json({ message: "Error creating the Trip", error: error.message });
  }
};

exports.getAllTrips = async (req, res, next) => {
  try {
    const allTrips = await Trip.find()
    .populate("_customer")
    res.status(201).json({ message: "All trips", allTrips });
  } catch (error) {
    res.status(400).json({ message: "Couldn't find any Trips" });
  }
};

exports.tripDetailsCtrl = async (req, res, next) => {
    const {id} = req.params
    console.log("Este es el ID a buscar",id)
    try {
        const foundTrip = await Trip.findById(id)
        res.status(201).json({message: "Found Trip is", foundTrip})
    } catch (error) {
        res.status(400).json({ message: "Couldn't find any Trips with that id", error });
    }
}
