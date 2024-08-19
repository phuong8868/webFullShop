const mongoose = require('mongoose');
const ClothingItemModel = require('./models/ClothingItemModel');

// Kết nối tới MongoDB
mongoose.connect("mongodb+srv://phuongtdgbh200021:Thanhan1213%40@cluster0.ekftst1.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");

  // Dữ liệu mẫu
  const sampleData = [
    {
      name: "T-Shirt",
      price: 19.99,
      linkPhoto: "https://example.com/t-shirt.jpg",
      description: "A comfortable cotton t-shirt."
    },
    {
      name: "Jeans",
      price: 49.99,
      linkPhoto: "https://example.com/jeans.jpg",
      description: "Stylish blue jeans."
    },
    {
      name: "Jacket",
      price: 89.99,
      linkPhoto: "https://example.com/jacket.jpg",
      description: "A warm jacket for the winter."
    }
  ];

  // Chèn dữ liệu mẫu vào cơ sở dữ liệu
  ClothingItemModel.insertMany(sampleData)
    .then(() => {
      console.log("Sample data inserted successfully!");
      mongoose.connection.close();
    })
    .catch(err => {
      console.error("Error inserting sample data:", err);
      mongoose.connection.close();
    });

}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
});
