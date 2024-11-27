/* eslint-disable no-unused-vars */
const express = require("express");
const multer = require("multer");
const { v4: uuid } = require("uuid");
require("dotenv").config();

const predictImage = require("../helpers/inferenceService");
const addData = require("../helpers/addData");
const getData = require("../helpers/getData");

// Initialize Express Router
const router = express.Router();

// Configure Multer storage and file size limit (1MB)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
}).single("image");

// POST endpoint for prediction
router.post("/predict", upload, async (req, res) => {
  const image = req.file;

  // Check if the image is present
  if (!image) {
    return res.status(400).json({
      status: "fail",
      message: "No image file provided",
    });
  }

  // If file size exceeds the limit
  if (image.size > 1000000) {
    return res.status(413).json({
      status: "fail",
      message: "Payload content length greater than maximum allowed: 1000000",
    });
  }

  try {
    const model = req.app.model;
    const { result, suggestion } = await predictImage(model, image);

    const id = uuid();
    const data = {
      id,
      result,
      suggestion,
      createdAt: Date.now().toString(),
    };

    await addData(id, data);

    return res.status(201).json({
      status: "success",
      message: "Model is predicted successfully",
      data,
    });
  } catch (err) {
    // If prediction or any other error occurs
    return res.status(400).json({
      status: "fail",
      message: "Terjadi kesalahan dalam melakukan prediksi",
    });
  }
});

router.get("/predict/histories", async (req, res) => {
  try {
    const histories = await getData();

    res.json({
      status: "success",
      data: histories,
    });
  } catch (error) {
    res.json({
      status: "fail",
      message: "Data gagal terambil",
    });
  }
});

module.exports = router;
