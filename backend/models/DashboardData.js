const mongoose = require('mongoose');

const dashboardDataSchema = new mongoose.Schema({
  realTimeData: [{
    name: String,
    value: Number
  }],
  pieData: [{
    name: String,
    value: Number
  }],
  teamData: [{
    team: String,
    effectif: Number,
    performances: [{
      hour: String,
      value: Number,
      status: String
    }]
  }],
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DashboardData', dashboardDataSchema);