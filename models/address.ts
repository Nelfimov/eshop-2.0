import { Schema, model, Types } from 'mongoose';

const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: Number, required: true },
  country: { type: String, required: true },
  fullName: { type: String, required: true },
  user: { type: Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['billing', 'shipping'] },
});

const Address = model('Address', AddressSchema);

export { Address };
