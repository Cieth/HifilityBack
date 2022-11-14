const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    profilePhoto: String,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    adress: String,
    city: String,
    state_province_region: String,
    zip: String,
    country: String,
    phoneNumber: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },

  { timestamps: true }
);
const User = model('User', userSchema);
module.exports = User;
