const mongoose = require("mongoose");
const Customer = require("../models/Customer.model");

exports.createCustomerCtrl = async (req, res, next) => {
  try {
    const { fullName, email, phoneNumber } = req.body;
    const customerCreated = await Customer.create({
      fullName,
      email,
      phoneNumber,
    });
    res.status(201).json({
      message: "Customer created successfully",
      customer: customerCreated,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating customer" });
  }
};
exports.deleteCustomerCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the customer by ID and delete it
    const deletedCustomer = await Customer.findByIdAndDelete(id);

    // If the customer doesn't exist, send back a 404 error
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Respond with a success message
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    // Respond with an error message
    res.status(500).json({ message: "Error deleting customer" });
  }
};
exports.editCustomerCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fullName, email, phoneNumber } = req.body;

    // Find the customer by ID and update their details
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      {
        fullName,
        email,
        phoneNumber,
      },
      { new: true }
    );

    // If the customer doesn't exist, send back a 404 error
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Respond with the updated customer details
    res.json({
      message: "Customer updated successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    // Respond with an error message
    res.status(500).json({ message: "Error updating customer" });
  }
};
exports.getCustomerIdCtrl = async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundCustomer = await Customer.findById(id);
    res.json({ message: "Customer found by id successfully", foundCustomer });
  } catch (error) {
    res.status(404).json({ message: "Customer not found" });
  }
};
