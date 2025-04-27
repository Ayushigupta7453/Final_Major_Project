import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  submission: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  url: { type: String, required: true }
}, { timestamps: true });

ReviewSchema.index({ url: 1, user: 1 }, { unique: true });

export default mongoose.model('Review', ReviewSchema);
