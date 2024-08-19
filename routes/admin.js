var express = require('express');
var router = express.Router();
const ClothingItemModel = require('../models/ClothingItemModel');

/* GET admin page */
router.get('/', async (req, res) => {
  try {
    const clothingItems = await ClothingItemModel.find();
    console.log("Fetched clothing items:", clothingItems); // Để kiểm tra dữ liệu
    res.render('adminPage', { clothingItems });
  } catch (error) {
    console.error("Error in /admin route:", error);
    res.status(500).send("Internal Server Error");
  }
});

/* GET create new clothing item form */
router.get('/create', (req, res) => {
  res.render('createClothingItem');
});

/* POST create new clothing item */
router.post('/create', async (req, res) => {
  try {
    const { name, price, linkPhoto, description } = req.body;
    const newClothingItem = new ClothingItemModel({ name, price, linkPhoto, description });
    await newClothingItem.save();
    res.redirect('/admin');
  } catch (error) {
    console.error("Error creating clothing item:", error);
    res.status(500).send("Internal Server Error");
  }
});

/* GET edit clothing item form */
router.get('/edit/:id', async (req, res) => {
  try {
    const item = await ClothingItemModel.findById(req.params.id);
    res.render('editClothingItem', { item });
  } catch (error) {
    console.error("Error fetching clothing item for edit:", error);
    res.status(500).send("Internal Server Error");
  }
});

/* POST update clothing item */
router.post('/edit/:id', async (req, res) => {
  try {
    const { name, price, linkPhoto, description } = req.body;
    await ClothingItemModel.findByIdAndUpdate(req.params.id, { name, price, linkPhoto, description });
    res.redirect('/admin');
  } catch (error) {
    console.error("Error updating clothing item:", error);
    res.status(500).send("Internal Server Error");
  }
});

/* POST delete clothing item */
router.post('/delete/:id', async (req, res) => {
  try {
    await ClothingItemModel.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (error) {
    console.error("Error deleting clothing item:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
