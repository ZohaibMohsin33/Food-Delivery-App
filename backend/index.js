import express from "express";
import connect from "./database/connection.js"; // Ensure this path is correct
import Category from "./model/foodCategory.model.js"; // Ensure this path is correct
import cors from "cors";
import morgan from "morgan";
import router from "./router/router.js"

const app = express();
const PORT = 8000;

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

// Routes
app.get('/', (req, res) => {
    res.send("The app is running");
});

app.use("/api",router)

// Connect to the database and start the server
connect()
    .then(() => {
        app.listen(PORT, async () => {
            console.log(`The server is running successfully on port: ${PORT}`);
            
            try {
                // Fetch data using the Category model
                const data = await Category.find({}).exec();
                
                console.log("Fetched data:");
                
                // Use .map() to iterate over each element
                data.forEach(item => {
                    console.log(item);  // Log each item
                });
                
            } catch (err) {
                console.error("Error fetching data: ", err);
            }
            
        });
    })
    .catch((err) => {
        console.error("Can't connect to the database", err);
    });
