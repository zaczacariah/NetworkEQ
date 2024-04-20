const router = require('express').Router();
const { 
  getUsers,
  // createUser
 } = require('../../controllers/userController.js');

// The `/api/user` endpoint
router.route('/').get(getUsers)

module.exports = router;
