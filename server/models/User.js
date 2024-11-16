const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },  
    password: { type: String, required: true },
    score: { type: Number, default: 0 }  
});


const UserModel = mongoose.model('User', UserSchema);  

module.exports = UserModel;  
