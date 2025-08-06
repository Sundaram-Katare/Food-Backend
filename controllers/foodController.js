import {
  createFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
} from '../models/foodModel.js';

export const addFood = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const food = await createFood({ name, description, category, price, image_url });
    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add food', error: err.message });
  }
};

export const getFoods = async (req, res) => {
  try {
    const foods = await getAllFoods();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch foods', error: err.message });
  }
};

export const getFood = async (req, res) => {
  try {
    const food = await getFoodById(req.params.id);
    if (!food) return res.status(404).json({ message: 'Food not found' });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: 'Error getting food', error: err.message });
  }
};

export const updateFoodById = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const updated = await updateFood(req.params.id, { name, description, category, price, image_url });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating food', error: err.message });
  }
};

export const deleteFoodById = async (req, res) => {
  try {
    await deleteFood(req.params.id);
    res.json({ message: 'Food deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting food', error: err.message });
  }
};
