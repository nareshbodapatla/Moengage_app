const express = require('express');
const axios = require('axios');
const Review = require('../models/Review');

const router = express.Router();

router.get('/search', async (req, res) => {
  const { by, value } = req.query;
  try {
    const response = await axios.get(`https://api.openbrewerydb.org/breweries?${by}=${value}`);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://api.openbrewerydb.org/breweries/${id}`);
    const reviews = await Review.find({ breweryId: id });
    res.json({ ...response.data, reviews });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/reviews', async (req, res) => {
  const { id } = req.params;
  const { rating, description } = req.body;
  const userId = req.user.id; // assume user is authenticated and user ID is available
  try {
    const newReview = new Review({ breweryId: id, userId, rating, description });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
