import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://zohaibmohsin30:food_app@gofood.kdpfm.mongodb.net/gofood", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");

        const collection = mongoose.connection.db.collection("foodItems");

        // Use async/await with .find()
        const data = await collection.find({}).toArray();
        
        if (data.length > 0) {
            global.food_item = data; // You can access it globally, but consider a better design pattern if the application scales
            const collect = mongoose.connection.db.collection("foodcategories");
            const Iata = await collect.find({}).toArray();
            global.food_category = Iata;
            console.log("Food items data fetched successfully");
        } else {
            console.log("No food items found in the database.");
        }

    } catch (error) {
        console.error("Database connection error:", error);
        throw error; // Ensure the error is propagated for proper handling
    }
};

export default connect;
