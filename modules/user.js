const mongoose= require('../config/DB');

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    age: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    }
});

const User= mongoose.model('User',userSchema);

module.exports.User= User;
module.exports.userSchema= userSchema;



