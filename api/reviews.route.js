import express from "express";
import ReviewsCtrl from "./reviews.controller.js";

const router = express.Router();

router.route('/movie/:id').get(ReviewsCtrl.apiGetReviews);
router.route('/new-review').post(ReviewsCtrl.apiPostReview);
router.route('/:id').put(ReviewsCtrl.apiUpdateReview)
                    .get(ReviewsCtrl.apiGetReview)
                    .delete(ReviewsCtrl.apiDeleteReview);

export default router;