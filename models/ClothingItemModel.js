const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  linkPhoto: { type: String, required: true },
  description: { type: String, required: true }
});

const ClothingItem = mongoose.model('ClothingItem', clothingItemSchema, 'ClothingItem');

module.exports = ClothingItem;
