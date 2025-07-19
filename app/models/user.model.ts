
import mongoose from "mongoose";
import { verifyToken } from "../utils/authToken";

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
    forgotPasswordToken: {
        type: String,
        default: null
    },
    forgotPasswordExpiry: {
        type: Date,
        default: null
    },
    verifyToken: {
        type: String,    
        default: null
    },
    verifyTokenExpiry: {
        type: Date,
        default: null
    },
})



const userMOdel = mongoose.models.Users || mongoose.model('Users', userShema);

export default userMOdel