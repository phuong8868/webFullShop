var express = require('express');
var router = express.Router();
const OrderModel = require('../models/OrderModel');
const ClothingItemModel = require('../models/ClothingItemModel');

// Mặc định một người dùng (user) giả lập
const defaultUserId = "64e2d6b3f5432a1e8b3f3cde"; // Thay thế bằng một ObjectId hợp lệ nếu cần

/* POST order */
router.post('/create/:id', async (req, res) => {
  try {
    const clothingItemId = req.params.id;
    const { quantity } = req.body;

    // Kiểm tra xem sản phẩm có tồn tại không
    const clothingItem = await ClothingItemModel.findById(clothingItemId);
    if (!clothingItem) {
      return res.status(404).send("Clothing item not found");
    }

    // Tính tổng giá trị đơn hàng
    const totalPrice = clothingItem.price * quantity;

    // Tạo đơn hàng mới
    const newOrder = new OrderModel({
      userId: defaultUserId, // Sử dụng người dùng mặc định
      clothingItemId: clothingItem._id,
      quantity,
      totalPrice
    });

    // Lưu đơn hàng
    await newOrder.save();

    // Chuyển hướng tới trang danh sách đơn hàng
    res.redirect('/orders');
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Internal Server Error");
  }
});

/* GET user's orders */
router.get('/', async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: defaultUserId }).populate('clothingItemId');
    res.render('userOrders', { orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
