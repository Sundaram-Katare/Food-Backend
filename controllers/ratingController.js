import { createRating, getRatingsByFood } from '../models/ratingModel.js';
import {pool} from '../db.js';

export const addRating = async (req, res) => {
    const { food_id, rating, comment } = req.body;
    const userId = req.user.id;

    try {
        const newRating = await createRating(userId, food_id, rating, comment);
        res.status(201).json(newRating);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getFoodRatings = async (req, res) => {
    try {
        const ratings = await getRatingsByFood(req.params.foodId);
        res.json(ratings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
