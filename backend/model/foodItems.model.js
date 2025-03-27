import mongoose from "mongoose";

const OptionsSchema = new mongoose.Schema({
    half: { type: String },
    full: { type: String },
    regular: { type: String },
    medium: { type: String },
    large: { type: String }
}, { _id: false }); // Prevents creating _id for sub-documents

const FoodItemSchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        required: [true, "Category name is required"]
    },
    name: {
        type: String,
        required: [true, "Food name is required"]
    },
    img: {
        type: String,
        required: [true, "Image URL is required"]
    },
    options: {
        type: [OptionsSchema], // Array of options
        required: [true, "Options are required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    }
});

// Export the model
export default mongoose.models.FoodItems || mongoose.model('FoodItem', FoodItemSchema);
