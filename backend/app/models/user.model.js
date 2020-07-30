const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    username: { type:String},
    password: { type:String},
    name: { type:String},
    rollno: { type:String},
   utype: {type:String}
});

UserSchema.methods.isValid = function(password){
    return  password===this.password;
}

module.exports = mongoose.model('User', UserSchema);
