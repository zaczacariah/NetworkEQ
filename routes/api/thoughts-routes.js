const router = require('express').Router();

const { 
  getThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,

 } = require('../../controllers/thoughtsController.js');

// The `/api/thought` endpoint

router.route('/').get(getThoughts).post(createThought);

router.route('/:_id').get(getThought).post(updateThought).delete(deleteThought);




module.exports = router;
