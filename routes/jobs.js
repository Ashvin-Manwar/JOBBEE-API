const express = require('express');
const router = express.Router();

//Importing  jobs controlling methods
const {
  getJobs,
  newJob,
  getJobsInRadius,
  updateJob,
  deleteJob,
  getJob,
  jobStats,
  applyJob,
} = require('../controllers/jobsController');
const { isAuthenticatedUser, authoriseRoles } = require('../middlewares/auth');

// router.get("/jobs", (req, res) => {});// we dont need here

router.route('/jobs').get(getJobs);
router.route('/job/:id/:slug').get(getJob);
router.route('/jobs/:zipcode/:distance').get(getJobsInRadius);
router.route('/stats/:topic').get(jobStats);

router
  .route('/job/new')
  .post(isAuthenticatedUser, authoriseRoles('employeer', 'admin'), newJob);

router
  .route('/job/:id/apply')
  .put(isAuthenticatedUser, authoriseRoles('user'), applyJob);

router
  .route('/job/:id')
  .put(isAuthenticatedUser, authoriseRoles('employeer', 'admin'), updateJob)
  .delete(isAuthenticatedUser, authoriseRoles('employeer', 'admin'), deleteJob);

module.exports = router;
