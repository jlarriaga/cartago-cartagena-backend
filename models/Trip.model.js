const { Schema, model } = require("mongoose");


const tripSchema = new Schema(
  {
    checkInDate: {
      type: Date,
      required: [true, "Check-in date is required."],
    },
    checkOutDate: {
      type: Date,
      required: [true, "Check-out date is required."],
    },
    numOfTravelers: {
      type: Number,
      required: [true, "Number of travelers is required."],
    },
    _properties: {
      type: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Property' 
        }]
    },
    _customer:{
        type: Schema.Types.ObjectId,
        ref:"Customer",
    }
  },
  {
   
    timestamps: true,
  }
);

const Trip = model("Trip", tripSchema);

module.exports = Trip;
