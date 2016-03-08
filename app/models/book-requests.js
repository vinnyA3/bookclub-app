//Book Request Model
var mongoose = require('mongoose');

var BookRequestSchema = mongoose.Schema({
  to: String,
  from: String,
  requestedBook: String,
  swapFor: String,
  approved: Boolean,
  isUsersRequest: Boolean //does this request belong to the logged in User?
});

module.exports = mongoose.model('BookRequest', BookRequestSchema);
