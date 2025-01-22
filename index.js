import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./server.js";
import ReviewsDAO from "./dao/reviewsDAO.js";
import UsersDAO from "./dao/usersDAO.js";

dotenv.config();
const mongo_username = process.env['MONGODB_USERNAME'];
const mongo_password = process.env['MONGODB_PASSWORD'];
const port = process.env["PORT_NUMBER"] || 8000;

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.ycbsz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri)
        .then(async () => {
            console.log("Connected to MongoDB successfully using Mongoose!");
            await ReviewsDAO.injectDB(mongoose.connection.useDb("movies"));
            try{
                await UsersDAO.initializeDB();
                console.log("Succesfully created UserModel and binded to 'movies'!");
            } catch (err) {
                console.error(`Failed to create UserModel: ${err}`);
                process.exit(1);
            }
            app.listen(port, () => {
                console.log(`Server is running on port: ${port}`);
            })
        }).catch((err) => {
            console.error(`Failed to establish a connection to MongoDB: ${err}`);
            process.exit(1);
        });