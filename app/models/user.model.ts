
import mongoose from "mongoose";
import { verifyToken } from "../utils/authToken";
import { Phetsarath } from "next/font/google";

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
 
    phone: {
        type: String,
        default: null   
    },
    address: {
        type: String,
        default: null   
    },
    profileImage: {
        type: String,
        default: null
    },
    resetToken: {
        type: String,
        default: null
    },
    resetTokenExpiry: {
        type: Date,
        default: null
    },
    verifyToken: {
    type: String,
    default: null,
  },
  verifyTokenExpiry: {
    type: Date,
    default: null,
  },

})



const userModel = mongoose.models.Users || mongoose.model('Users', userShema);

export default userModel