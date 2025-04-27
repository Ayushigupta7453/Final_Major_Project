
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import Submission from '../models/Submission.js';
import { authenticate } from '../middleware/auth.js';
import normalizeUrl from 'normalize-url';

dotenv.config();
const router = express.Router();


// helpers 

const canon = (raw) =>
  normalizeUrl(raw, {
    stripProtocol: true,
    stripHash: true,
    removeTrailingSlash: true,
    removeDirectoryIndex: true,
    stripWWW: false,
  }).toLowerCase();

// ensure the URL we send to Flask has http/https 
const withProtocol = (url) =>
  url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;


//POST  /api/submissions  – check a job posting 

router.post('/', authenticate, async (req, res) => {
  const { url: rawUrl } = req.body;
  const canonicalUrl = canon(rawUrl);
  const requestUrl   = withProtocol(rawUrl);

  if (!canonicalUrl) return res.status(400).json({ msg: 'URL required' });

  try {
    /* call Python ML service */
    const response = await fetch(process.env.PYTHON_MODEL_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: requestUrl }),
    });
    const result = await response.json();

    /* upsert by (user, canonicalUrl) */
    const submission = await Submission.findOneAndUpdate(
      { user: req.user.id, url: canonicalUrl },
      {
        user: req.user.id,
        url: canonicalUrl,
        prediction: result.label,
        confidence: result.confidence,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json(submission);
  } catch (err) {
    console.error('[ML service error]', err);
    res.status(502).json({ msg: 'Prediction service unavailable' });
  }
});


/* GET  /api/submissions/me  – current user’s history */
router.get('/me', authenticate, async (req, res) => {
  const submissions = await Submission.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(submissions);
});

export default router;
