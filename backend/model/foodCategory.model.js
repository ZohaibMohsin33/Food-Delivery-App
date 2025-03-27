import mongoose from "mongoose";

// Define the schema for categories
const CategorySchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        required: [true, "Category name is required"],
        unique: true // Ensure each category name is unique
    }
});

// Export the model
export default mongoose.models.FoodCategory || mongoose.model('FoodCategory', CategorySchema);
