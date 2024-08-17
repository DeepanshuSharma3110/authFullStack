import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        required: true, 
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); 
            },
            message: "Please enter a valid email address",
        },
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'], 
        required: true, 
    },
    randomKey:{
        type:String
    },
    expiresAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
});

const userModel = mongoose.model('User', userSchema);
export default userModel;
