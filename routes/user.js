const express = require('express');
const router = express.Router();

const {
  getUserProfile,
  updatePassword,
  updateUser,
  deleteUser,
  getAppliedJobs,
  getPublishedJobs,
  getUsers,
  deleteUserAdmin,
} = require('../controllers/userController');
const { isAuthenticatedUser, authoriseRoles } = require('../middlewares/auth');

router.use(isAuthenticatedUser);

router.route('/me').get(getUserProfile);
router.route('/jobs/applied').get(authoriseRoles('user'), getAppliedJobs);
router
  .route('/jobs/published')
  .get(authoriseRoles('employeer', 'admin'), getPublishedJobs);

router.route('/password/update').put(updatePassword);
router.route('/me/update').put(updateUser);

router.route('/me/delete').delete(deleteUser);

//Admin only routes
router.route('/users').get(authoriseRoles('admin'), getUsers);
router.route('/user/:id').delete(authoriseRoles('admin'), deleteUserAdmin);

module.exports = router;
