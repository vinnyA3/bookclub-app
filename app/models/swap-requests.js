var mongoose = require('mongoose');

var SwapRequestSchema = mongoose.Schema({
  from: String,
  requestedBook: String,
  swapFor: String,
  approval: String,
  belongsTo: [{type: mongoose.SchemaTypes.ObjectId, ref:'User'}]
});

module.exports = mongoose.model('SwapRequest', SwapRequestSchema);
