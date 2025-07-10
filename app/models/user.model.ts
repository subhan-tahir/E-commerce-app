
import mongoose from "mongoose";

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
    }
})



const userMOdel = mongoose.models.Users || mongoose.model('Users', userShema);

export default userMOdel