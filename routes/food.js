const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Food = require("../models/food");

router.get("/allfood", async (req, res) => {
  await Food.find()
    .then((foods) => {
      res.json({ foods });
    })

    .catch((err) => {
      console.log(err);
    });
});

router.post("/uploadfood", async (req, res) => {
  const {
    id,
    name,
    shortDescription,
    fullDescription,
    price,
    image_1,
    image_2,
    type,
  } = req.body;

  if (!name || !id || !price || !shortDescription || !fullDescription) {
    return res.status(422).json({ error: "Plaease add all the fields" });
  }
  const food = new Food({
    id,
    name,
    price,
    shortDescription,
    fullDescription,
    image_1,
    image_2,
    type,
  });
  food
    .save()
    .then((result) => {
      res.json({ food: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
