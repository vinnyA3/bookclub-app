var mongoose = require('mongoose'),
    bcrypt = require('bcrpyt-nodejs');

var UserSchema = mongoose.Schema({
    name: String,
    email: {type: String, index:{unique:true}},
    password: {type: String, select:false},
    swapRequests: [{type: mongoose.SchemaTypes.ObjectId, ref:'SwapRequests'}],
    outstandingRequests: [{type: mongoose.SchemaTypes.ObjectId, ref: 'OutstandingRequests'}],
    swapApprovals: [{type: mongoose.SchemaTypes.ObjectId, ref: 'SwapApprovals'}]
});

UserSchema.methods.hashPassword = function(password){
  return bcrpyt.hashSync(password, bcrypt.genSaltSync(8,null));
};

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
