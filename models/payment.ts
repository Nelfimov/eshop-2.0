import { Schema, model } from 'mongoose';

const PaymentSchema = new Schema({
  transactionID: { type: String, required: true },
  type: { type: String, required: true, enum: ['paypal'] },
});

const Payment = model('Payment', PaymentSchema);

export { Payment };
