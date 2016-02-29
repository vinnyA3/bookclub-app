var mongoose = require('mongoose');

var OutstandingRequests = mongoose.Schema({
  to: String,
  requestedBook: String,
  swapFor: String,
  status: String,
  belongsTo: [{type: mongoose.SchemaTypes.ObjectId, ref:'User'}]
});

module.exports = mongoose.model('OutstandingRequest',OutstandingRequests);
