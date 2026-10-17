import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerId: String,
  total: Number,
});

export const Order = mongoose.model('Order', orderSchema);
