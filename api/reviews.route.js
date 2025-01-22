import express from "express";
import ReviewsCtrl from "./reviews.controller.js";

const reviewsRouter = express.Router();

reviewsRouter.route('/movie/:id').get(ReviewsCtrl.apiGetReviews);
reviewsRouter.route('/new-review').post(ReviewsCtrl.apiPostReview);
reviewsRouter.route('/:id').put(ReviewsCtrl.apiUpdateReview)
                    .get(ReviewsCtrl.apiGetReview)
                    .delete(ReviewsCtrl.apiDeleteReview);

export default reviewsRouter;