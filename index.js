/*
1. Start the server + listen on a port
2. Setup a connection to MongoDb
3. Process the environment variables
*/
import dotenv from "dotenv";
import mongodb from "mongodb";
import app from "./server.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

dotenv.config();
const mongo_username = process.env['MONGODB_USERNAME'];
const mongo_password = process.env['MONGODB_PASSWORD'];
const port = process.env["PORT_NUMBER"] || 8000;

const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.ycbsz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

MongoClient.connect(uri, {maxPoolSize:50, wtimeoutMS:3000})
    .catch((e) => {
        console.error(`Raised a connection error: ${e.stack}`);
        process.exit(1);
    }).then(async client => {
        await ReviewsDAO.injectDB(client);
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        })
    });