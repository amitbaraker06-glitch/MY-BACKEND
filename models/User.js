const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, unique: true, required: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['farmer','vendor','admin'], default: 'farmer' },
  location: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) return next();
    const saltRounds = 10;
    const hashed = await bcrypt.hash(this.password, saltRounds);
    this.password = hashed;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
