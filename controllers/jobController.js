const Job = require("../models/Job");

// Get all jobs 
exports.getJobs = async (req, res) => {
  try {
    const { status, sort } = req.query;

    let filter = {};
    if (status) filter.status = status;

    const jobs = await Job.find(filter).sort({
      appliedDate: sort === "desc" ? -1 : 1,
    });

    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new job
exports.createJob = async (req, res) => {
  try {
    const newJob = await Job.create(req.body);
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
