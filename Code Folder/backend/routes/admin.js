import express from 'express';
import { authenticate, adminOnly } from '../middleware/auth.js';
import User from '../models/User.js';
import Submission from '../models/Submission.js';
import Review from '../models/Review.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Protect all routes below
router.use(authenticate, adminOnly);

// Users CRUD
router.get('/users', async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: 'User deleted' });
});

// Submissions list
router.get('/submissions', async (req, res) => {
  const subs = await Submission.find().populate('user', 'email');
  res.json(subs);
});

// Reviews list
router.get('/reviews', async (req, res) => {
  const reviews = await Review.find().populate('user', 'email').populate('submission');
  res.json(reviews);
});

export default router;
