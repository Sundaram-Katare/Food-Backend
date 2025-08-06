import bcrypt from 'bcrypt';
import { findUserByEmail, createUser } from '../models/userModel.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log(req.body);

    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, email, hashedPassword, role);
    const token = generateToken(newUser);

    res.status(201).json({ user: { id: newUser.id, name, email, role }, token });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ user: { id: user.id, name: user.name, email, message: "Login Successfully", role: user.role }, token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
