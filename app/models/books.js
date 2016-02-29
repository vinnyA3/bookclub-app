var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
  title: String,
  imgLink: String,
  owner: [{type: mongoose.SchemaTypes.ObjectId, ref: 'User'}]
});

mongoose.exports = mongoose.model('Book', BookSchema);
