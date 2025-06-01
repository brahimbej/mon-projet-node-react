const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: true
  },
  output: {
    type: Number,
    required: true
  }
}, { _id: false });

const dashboardEntrySchema = new mongoose.Schema({
  hour: {
    type: String,
    required: true
  },
  effectif: {
    type: Number,
    required: true
  },
  machines: [machineSchema]
}, { _id: false });

const dashboardDataSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  entries: [dashboardEntrySchema],
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['success', 'error', 'processing'],
    default: 'success'
  },
  // You can add more metadata here if needed, like:
  // uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // shift: String,
  // date: Date
});

// Create a compound index if you'll be querying by date/upload time often
dashboardDataSchema.index({ uploadedAt: -1 });

const DashboardData = mongoose.model('DashboardData', dashboardDataSchema);

module.exports = DashboardData;