import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },
  prediction: { type: String, enum: ['Real', 'Fake'], required: true },
  confidence: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('Submission', SubmissionSchema);
