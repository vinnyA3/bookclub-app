var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
    name: String,
    email: {type: String, index:{unique:true}},
    password: {type: String, select:false},
    location: String,
    books: [{type: mongoose.SchemaTypes.ObjectId, ref:'Book'}],
    bookRequests: [BookRequest]
});

/*User Middleware - remove all Book docs and book requests that reference the removed User
UserSchema.pre('findOneAndUpdate', function(req,res,next){
  //this.model('BookRequest').remove({belongsTo: this._id});
  console.log(req.user);
  this.model('Book').remove({owner: this._id}, next);
});*/

UserSchema.methods.hashPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8,null));
};

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password.toString());
};

module.exports = mongoose.model('User', UserSchema);
