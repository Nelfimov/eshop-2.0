import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  quantityOnStock: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
  deliveryPrice: { type: Number },
  discount: { type: Number },
  titleImage: { type: String, required: true },
  subImages: [{ type: String }],
});

ProductSchema.virtual('totalPrice').get(function () {
  return this.price + this.deliveryPrice ?? 0 - this.discount;
});

const Product = model('Product', ProductSchema);

export { Product };
