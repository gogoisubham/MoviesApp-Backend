import ReviewsDAO from "../dao/reviewsDAO.js";


export default class ReviewsCtrl {
    static async apiGetReviews(req, res, next) {
        try {
            const movieId = req.params.id || {};
            const reviews = await ReviewsDAO.getReviewsByMovieId(movieId);

            if(!reviews) {
                res.status(404).json({error: 'No reviews found for this movie'});
                return;
            }
            res.status(200).json({reviews});
        } catch (err){
            console.error(`Failed to retrieve reviews, error: ${err.stack}`);
            res.status(500).json({error: err.message});
        };
    };

    static async apiPostReview(req, res, next) {
        try {
            const user = req.body.user;
            const movieId = req.body.movieId;
            const review = req.body.review;
            if (!user || !movieId || !review) {
                return res.status(400).json({error: "Missing required fields"});
            }

            await ReviewsDAO.addReview(user, movieId, review);
            res.status(200).json({status:'success'});
        } catch (err){
            console.error(`Unable to add review: ${err.stack}`);
            res.status(500).json({error: err.message});
        }; 
    };

    static async apiUpdateReview(req, res, next) {
        try {
            let reviewId = req.params.id;
            let user = req.body.user;
            let review = req.body.review;

            if (!/^[a-fA-F0-9]{24}$/.test(reviewId)) {
                return res.status(400).json({error: "Invalid ReviewId provided"});
            }

            if(!reviewId || !user || !review) {
                return res.status(400).json({error: "Missing required fields"});
            }

            const updateResponse = await ReviewsDAO.updateReview(reviewId, user, review);
            var error = updateResponse.error;
            if (error) {
                return res.status(400).json({error});
            }

            if (updateResponse.modifiedCount === 0){
                throw new Error("Review not found");
            }

            res.status(200).json({status: "success"});
        } catch (err) {
            console.error(`Unable to update review, ${err}`);
            res.status(500).json({error: err.message});
        };
    };

    static async apiGetReview(req, res, next) {
        try {
            let reviewId = req.params.id;
            if(!reviewId || !/^[a-fA-F0-9]{24}$/.test(reviewId)) {
                return res.status(400).json({error: 'Invalid review id provided'});
            }

            const reviewResponse = await ReviewsDAO.getReview(reviewId);
            if (!reviewResponse) {
                return res.status(404).json({error:'Review not found'});
            }

            res.json({status:"success", data:reviewResponse});
        } catch (err) {
            console.error(`Error: ${err}`);
            res.status(404).json({error: err.message});
        };
    };

    static async apiDeleteReview(req, res, next) {
        try {
            let reviewId = req.params.id;``
            if(!reviewId || !/^[a-fA-F0-9]{24}$/.test(reviewId)) {
                return res.status(400).json({error:"Invalid review id provided"});
            }

            const response = await ReviewsDAO.deleteReview(reviewId);
            if (response.deletedCount === 0) {
                return res.status(404).json({error: "Review not found or already deleted"});
            }
            res.json({status: "success", message: "Review deleted successfully"});
        } catch (err) {
            console.error(`Error: ${err.stack}`);
            res.status(500).json({error: err.message});
        };
    };
};