import { getCartItems, addToCart, deleteCartItem } from "../models/cartModel.js";

export const addCartItem = async(req, res) => {
    const { food_id, quantity } = req.body;
    const user_id = req.user.id;

    if(!food_id || !quantity) {
        return res.status(400).json({message: "food_id and quantity are required"});
    }

    try {
        await addToCart(user_id, food_id, quantity);
        res.status(200).json("Items Added/Updated in the cart");
    } catch (err) {
        res.status(500).json({error: err.message });
    }
};

export const getCart = async (req, res) => {
  const user_id = req.user.id;

  try {
    const cart = await getCartItems(user_id);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeCartItem = async (req, res) => {
  const id = req.params.id;
  const user_id = req.user.id;

  try {
    const result = await deleteCartItem(user_id, id);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};