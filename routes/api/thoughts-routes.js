const router = require('express').Router();

const { 
  getThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction

 } = require('../../controllers/thoughtsController.js');

// The `/api/thought` endpoint

router.route('/').get(getThoughts).post(createThought);

router.route('/:_id').get(getThought).post(updateThought).delete(deleteThought);

router.route('/:_id/reactions').post(createReaction).delete(deleteReaction);




module.exports = router;
