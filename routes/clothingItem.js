var express = require('express');
var router = express.Router();
const ClothingItemModel = require('../models/ClothingItemModel');

/* GET clothing items */
router.get('/', async (req, res) => {
  const clothingItems = await ClothingItemModel.find();

  res.send({ stauts: 0, data: clothingItems });
  // res.render('index', { clothingItems });
});

/* GET detail page */
router.get('/detail/:id', async (req, res) => {
  const product = await ClothingItemModel.findById(req.params.id);
  
  res.send({ stauts: 0, data: product });
  // res.render('detail', { product });
});

module.exports = router;
