const mongoose = require('mongoose');

const soilReportSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  nitrogen: {
    type: Number,
    required: true,
    min: 0,
    max: 500
  },
  phosphorus: {
    type: Number,
    required: true,
    min: 0,
    max: 500
  },
  potassium: {
    type: Number,
    required: true,
    min: 0,
    max: 500
  },
  ph: {
    type: Number,
    required: true,
    min: 3,
    max: 10
  },
  moisture: {
    type: Number,
    min: 0,
    max: 100
  },
  temperature: {
    type: Number,
    min: -10,
    max: 60
  },
  electricalConductivity: {
    type: Number,
    min: 0
  },
  organicCarbon: {
    type: Number,
    min: 0,
    max: 10
  },
  soilType: {
    type: String,
    enum: ['Clay', 'Sandy', 'Loamy', 'Silty', 'Peaty', 'Chalky', 'Red Soil', 'Black Soil', 'Alluvial Soil', 'Lateritic Soil', 'Mountain Soil', 'Desert Soil'],
    default: 'Loamy'
  },
  latitude: {
    type: Number,
    min: -90,
    max: 90
  },
  longitude: {
    type: Number,
    min: -180,
    max: 180
  },
  status: {
    nitrogen: { type: String, enum: ['Low', 'Medium', 'High'] },
    phosphorus: { type: String, enum: ['Low', 'Medium', 'High'] },
    potassium: { type: String, enum: ['Low', 'Medium', 'High'] },
    ph: { type: String, enum: ['Strongly Acidic', 'Acidic', 'Neutral', 'Alkaline', 'Strongly Alkaline'] }
  },
  notes: String
}, {
  timestamps: true
});

// Indexes
soilReportSchema.index({ farmerId: 1, createdAt: -1 });
soilReportSchema.index({ latitude: 1, longitude: 1 });

module.exports = mongoose.model('SoilReport', soilReportSchema);