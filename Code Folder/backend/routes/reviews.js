import express from 'express';
import Review from '../models/Review.js';
import Submission from '../models/Submission.js';
import { authenticate } from '../middleware/auth.js';
// helper — put this at the top of each file once
import normalizeUrl from 'normalize-url';

const canon = (raw) =>
  normalizeUrl(raw, {
    // kill everything that shouldn’t matter when grouping reviews
    stripProtocol: true,          // drops http://  https://
    stripHash: true,
    removeTrailingSlash: true,
    removeDirectoryIndex: true,
    stripWWW: false,              // keep www.example.com distinct if you like
  }).toLowerCase();               // case‑fold



const router = express.Router();

// Get all reviews for a submission (public)
router.get('/:submissionId', async (req, res) => {
    const submission = await Submission.findById(req.params.submissionId);
    if (!submission) return res.status(404).json({ msg: 'Submission not found' });
  
    const url = canon(submission.url);
    const reviews = await Review.find({ url })
                                .populate('user', 'name')
                                .sort({ createdAt: -1 });
    res.json(reviews);
});

router.post('/:submissionId', authenticate, async (req, res) => {
    const { rating, comment } = req.body;
    if (!rating) return res.status(400).json({ msg: 'Rating required' });
  
    const submission = await Submission.findById(req.params.submissionId);
    if (!submission) return res.status(404).json({ msg: 'Submission not found' });
  
    const url = canon(submission.url);
  
    const review = await Review.findOneAndUpdate(
      { url, user: req.user.id },
      { url, submission: submission._id, rating, comment },
      { upsert: true, new: true, runValidators: true }
    );
  
    res.json(review);
  });

export default router;
