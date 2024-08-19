var express = require('express');
var router = express.Router();
const ClothingItemModel = require('../models/ClothingItemModel');

/* GET home page. */
router.get('/', async (req, res) => {
  const clothingItems = await ClothingItemModel.find();
  res.render('index', { clothingItems });
});

/* GET search results */
router.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    const clothingItems = await ClothingItemModel.find({
      name: { $regex: query, $options: 'i' }
    });

    res.send({ stauts: 0, data: clothingItems });
    // res.render('index', { clothingItems });
  } catch (error) {
    console.error("Error searching clothing items:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
