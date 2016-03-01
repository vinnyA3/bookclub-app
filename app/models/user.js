var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
    name: String,
    email: {type: String, index:{unique:true}},
    password: {type: String, select:false},
    books: [{type: mongoose.SchemaTypes.ObjectId, ref:'Book'}],
    swapRequests: [{type: mongoose.SchemaTypes.ObjectId, ref:'SwapRequests'}],
    outstandingRequests: [{type: mongoose.SchemaTypes.ObjectId, ref: 'OutstandingRequest'}]
});

UserSchema.methods.hashPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8,null));
};

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password.toString());
};

module.exports = mongoose.model('User', UserSchema);
