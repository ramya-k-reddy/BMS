const router = require("express").Router();
const Theatre = require("../models/theatreModel");

router.post("/create", async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.send({
      success: true,
      message: "Theatre created successfully",
      theatre: newTheatre,
    });
  } catch (error) {
    console.error("Error creating theatre:", error);
    res.send({
      success: false,
      message: "Failed to create theatre",
      error: error.message,
    });
  }
});

router.put("/update-:theatre", async (req, res) => {
  try {
    const theatreId = req.params.theatre;
    const updatedTheatre = await Theatre.findByIdAndUpdate(
      req.body._id,
      req.body
    );
    if (!updatedTheatre) {
      return res
        .status(404)
        .send({ success: false, message: "Theatre not found" });
    }
    res.send({
      success: true,
      message: "Theatre updated successfully",
      theatre: updatedTheatre,
    });
  } catch (error) {
    console.error("Error updating theatre:", error);
    res.status(500).send({
      success: false,
      message: "Failed to update theatre",
      error: error.message,
    });
  }
});

router.delete("/delete-theatre/:theatreId", async (req, res) => {
  try {
    const theatreId = req.params.theatreId;
    const deletedTheatre = await Theatre.findByIdAndDelete(theatreId);
    if (!deletedTheatre) {
      return res
        .status(404)
        .send({ success: false, message: "Theatre not found" });
    }
    res.send({
      success: true,
      message: "Theatre deleted successfully",
      theatre: deletedTheatre,
    });
  } catch (error) {
    console.error("Error deleting theatre:", error);
    res.status(500).send({
      success: false,
      message: "Failed to delete theatre",
      error: error.message,
    });
  }
});

router.get("/get-all-theatres", async (req, res) => {
  try {
    const alltheatres = await Theatre.find().populate("owner");
    res.send({
      success: true,
      message: "Theatres fetched successfully",
      data: alltheatres,
    });
  } catch (error) {
    console.error("Error fetching theatres:", error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch theatres",
      error: error.message,
    });
  }
});

router.get("/get-theatre-by-owner/:ownerId", async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const theatres = await Theatre.find({ owner: ownerId });
    if (theatres.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No theatres found for this owner",
      });
    }
    res.send({
      success: true,
      message: "Theatres fetched successfully",
      data: theatres,
    });
  } catch (error) {
    console.error("Error fetching theatres by owner:", error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch theatres",
      error: error.message,
    });
  }
});



module.exports = router;
