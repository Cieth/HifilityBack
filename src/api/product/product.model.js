const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: [String],
      required: true,
    },
    rating: [String],
    //products : [{type : Schema.Types.ObjectId,ref : "Product"}]
  },
  { timestamps: true }
);
const Product = model('Product', productSchema);
module.exports = Product;
