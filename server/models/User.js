const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },  // Ensuring unique emails
    password: { type: String, required: true },
    score: { type: Number, default: 0 }  // Adding the score field with a default value of 0
});

// Creating and exporting the 'User' model
const UserModel = mongoose.model('User', UserSchema);  // Changed 'Users' to 'User' to follow naming conventions

module.exports = UserModel;  // Correctly exporting the User model
