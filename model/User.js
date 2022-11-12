const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  mobile: { type: String },
  password: { type: String },
  cart_item: [
    {
      id:{type:Number},
      title: {type:String},
      image: {type:String},
      price: {type:Number},
      incPrice:{type:Number},
      quantity:{type:Number},
      count:{type:Number}
    },
  ],
  date: Date,
});

const User = mongoose.model("user", userSchema);
module.exports = User;
