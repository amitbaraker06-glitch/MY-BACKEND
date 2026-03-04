const User = require('../models/User');

// Create
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    const result = user.toObject(); delete result.password;
    res.status(201).json(result);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Email already exists' });
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Read all
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt');
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Read one
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Update
exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;
    // Prevent password via this route (or handle specially)
    if (updates.password) delete updates.password;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Delete
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted', user });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
