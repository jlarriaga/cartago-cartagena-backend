const mongoose = require("mongoose");
const {ISODate} = require("mongoose")
const Property = require("../models/Property.model");

exports.getAllPropertiesCtrl = async (req, res, next) => {
  try {
    const propertiesList = await Property.find();
    res.status(200).json(propertiesList);
  } catch (error) {
    res.status(400).json({ message: "Error finding all Properties" });
  }
};

exports.createPropertiesCtrl = async (req, res, next) => {
  try {
    const {
      title,
      moreInfo,
      location,
      pricePerNight,
      maxGuests,
      cleaningFee,
      chekinTime,
      checkOutTime,
      availableDates,
      amenities,
      terms,
      images,
    } = req.body;

    const propertyCreated = await Property.create({
      title,
      moreInfo,
      location,
      pricePerNight,
      maxGuests,
      cleaningFee,
      chekinTime,
      checkOutTime,
      availableDates,
      amenities,
      terms,
      images,
    })
    res.status(201).json({ message: "Property created successfully" , property: propertyCreated });
  } catch (error) {
    res.status(400).json({ message: "Error creating the Property" });
  }
};


exports.findAvailablePropertiesCtrl = async (req, res, next) => {
    const {checkinDate, checkoutDate, numOfTravelers,...rest} = req.body
    console.log("Este es el CL", checkinDate, checkoutDate, numOfTravelers);
     try {
       
      // const availableProperties = await Property.find()
        const availableProperties = await Property
        .find({
            availableDates:{
                $elemMatch:{
                    $gte: checkinDate,
                    $lte: checkoutDate
            }},
            maxGuests:{
                $gte: numOfTravelers
            }})
        console.log(availableProperties)
        res.status(200).json({ message: "Properties found" , availableProperties });
    } catch (error) {
      res.status(400).json({ message: "Error finding properties" });
    }
}

exports.getPropertybyIdCtrl = async (req, res, next) => {
  const {id} = req.params

  try {
    const propertyFound = await Property.findById(id)
    res.status(201).json({message: "Property found by id", propertyFound})
  } catch (error) {
    res.status(400).json({message: "Couldn't find any property with that id", error})
    
  }
}

