import { Schema, model, Types } from 'mongoose';
import { Address as IAddress } from '../@types/common/address.js';

const AddressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: Number, required: true },
  country: { type: String, required: true },
  fullName: { type: String, required: true },
  user: { type: Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['billing', 'shipping'] },
  email: { type: String },
});

const Address = model('Address', AddressSchema);

export { Address };
