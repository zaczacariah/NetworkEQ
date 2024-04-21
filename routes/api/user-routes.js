const router = require('express').Router();
const { 
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
 } = require('../../controllers/userController.js');

// The `/api/user` endpoint
router.route('/').get(getUsers).post(createUser);

router.route('/:_id').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:_id/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
