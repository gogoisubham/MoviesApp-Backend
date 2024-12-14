import express from "express";
import cors from "cors";
import router from "./api/reviews.route.js";

const app = express();

//set up middleware 
app.use(express.json());  // parsing json request bodies
app.use(cors());          

app.use('/movies-api/v1/reviews', router);
app.use('*', (req, res) => {
    res.status(404).json({error:"Not found"})
});

export default app;
