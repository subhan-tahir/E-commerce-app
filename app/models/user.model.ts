
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
})



const userMOdel = mongoose.models.Users || mongoose.model('Users', userShema);

export default userMOdel