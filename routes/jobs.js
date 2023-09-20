const express = require("express");
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
} = require("../controllers/jobsController");

// router.get("/jobs", (req, res) => {});// we dont need here

router.route("/jobs").get(getJobs);
router.route("/job/:id/:slug").get(getJob);
router.route("/jobs/:zipcode/:distance").get(getJobsInRadius);
router.route("/stats/:topic").get(jobStats);

router.route("/job/new").post(newJob);
router.route("/job/:id").put(updateJob).delete(deleteJob);

module.exports = router;
