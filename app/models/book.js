var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
  title: String,
  imgLink: String,
  owner: mongoose.SchemaTypes.ObjectId
});

module.exports = mongoose.model('Book', BookSchema);
