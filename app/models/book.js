var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
  title: String,
  imgLink: String,
  owner: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Book', BookSchema);
