import { Schema, model } from 'mongoose';
import { Payment } from '../@types/common/index.js';

const PaymentSchema = new Schema<Payment>({
  transactionID: { type: String, required: true },
  type: { type: String, required: true, enum: ['paypal'] },
});

const Payment = model('Payment', PaymentSchema);

export { Payment };
