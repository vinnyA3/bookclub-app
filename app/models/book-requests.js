//Book Request Model
var mongoose = require('mongoose');

var BookRequestSchema = mongoose.Schema({
  requestFor: String,
  from: String,
  requestedBook: String,
  swapFor: String,
  approved: Boolean
});

module.exports = mongoose.model('BookRequest', BookRequestSchema);
