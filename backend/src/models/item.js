import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

export default Item;