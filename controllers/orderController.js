import { createOrder, getOrderByUser, updateOrderStatus, getAllOrders } from '../models/orderModel.js';

export const addOrder = async (req, res) => {
  try {
    const { total_amount, payment_status, order_status } = req.body;
    const user_id = req.user.id; // from auth middleware
    const order = await createOrder({ user_id, total_amount, payment_status, order_status });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create order', error: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await getOrderByUser(req.user.id);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

export const changeOrderStatus = async (req, res) => {
  try {
    const { order_status } = req.body;
    const order = await updateOrderStatus(req.params.id, order_status);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order status', error: err.message });
  }
};

export const listAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch all orders', error: err.message });
  }
};
