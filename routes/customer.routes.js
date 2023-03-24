const express = require("express");
const router = express.Router();
const { createCustomerCtrl, deleteCustomerCtrl, editCustomerCtrl, getAllCustomersCtrl } = require("../controllers/customer.controller")

const {isAuthenticated} = require("../middleware/jwt.middleware")

router.post("/create",isAuthenticated, createCustomerCtrl)
router.delete("/:id/delete",isAuthenticated, deleteCustomerCtrl)
router.patch("/:id/edit",isAuthenticated, editCustomerCtrl)
router.get("/all-customers", isAuthenticated, getAllCustomersCtrl)


module.exports = router;
