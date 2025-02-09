import express from "express";
import cors from "cors";
import reviewsRouter from "./api/reviews.route.js";
import usersRouter from "./api/users.route.js";

const app = express();

app.use(express.json());  
app.use(cors());          

app.use('/movies-backend/v1/reviews', reviewsRouter);
app.use('/movies-backend/v1/users', usersRouter);
app.use('*', (req, res) => {
    res.status(404).json({error:"Not found"})
});

export default app;
