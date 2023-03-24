const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User.model");

const saltRounds = 10;

exports.signupCtrl = async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;

    // Check if email or password or name are provided as empty strings
    if (email === "" || password === "" || fullName === "") {
      res.status(400).json({ message: "Provide email, password and name" });
      return;
    }

    // This regular expression check that the email is of a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
      return;
    }

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      res.status(400).json({ message: "User already exists." });
      return;
    }

    // If email is unique, proceed to hash the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const {
      email: emailCreated,
      fullName: fullNameCreated,
      _id,
    } = await User.create({ email, fullName, password: hashedPassword });

    const payload = {
      email: emailCreated,
      fullName: fullNameCreated,
      _id,
    };
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });

    res.status(200).json({ authToken });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ messageError: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        messageError: "Email already exists",
      });
    }
    return res.status(500).json({ messageError: error.message });
  }
};

exports.loginCtrl = async (req, res, next) => {

  try {
    // Check if email or password are provided as empty string
    if (req.body.email === "" || req.body.password === "") {
      res.status(400).json({ message: "Provide email and password." });
      return;
    }
     // Check the users collection if a user with the same email exists
     const foundUser = await User.findOne({email:req.body.email})
     if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." });
        return;
      }
    // Compare the provided password with the one saved in the database
    const passwordCorrect = bcrypt.compareSync(req.body.password, foundUser.password);
    if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, fullName } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, email, fullName };

        // Create a JSON Web Token and sign it
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
        return ;
      }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ messageError: error.message });
      }
      if (error.code === 11000) {
        return res.status(400).json({
          messageError: "Email and password combination is incorrect",
        });
      }
      return res.status(500).json({ messageError: error.message });
    
  }
};

exports.verifyCtrl = (req,res,next)=>{
    res.status(200).json(req.payload)
}
