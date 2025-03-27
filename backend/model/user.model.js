import mongoose from "mongoose";



const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Food name is required"]
    },
    password: {
        type: String,
        required: [true, "Image URL is required"]
    },
    email: {
        type: String, // Array of options
        required: [true, "Options are required"],
        unique : true
    },
    location: {
        type: String,
        required: [true, "Description is required"]
    }
});

// Export the model
export default mongoose.models.Users || mongoose.model('User', UserSchema);
