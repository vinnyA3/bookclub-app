var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    BookRequest = require('./book-requests.js').schema;

var UserSchema = mongoose.Schema({
    name: String,
    email: {type: String, index:{unique:true}},
    password: {type: String, select:false},
    location: String,
    books: [{type: mongoose.SchemaTypes.ObjectId, ref:'Book'}],
    bookRequests: [BookRequest]
});

UserSchema.methods.hashPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8,null));
};

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password.toString());
};

module.exports = mongoose.model('User', UserSchema);
