import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

let reviews_conn;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews_conn) {
            return;
        }
        try {
            reviews_conn = await conn.collection("reviews");
        } catch (err) {
            console.error(`Unable to establish collection handle in userDAO: ${err.stack}`);
        };
    };

    static async getReviewsByMovieId(movieId) {
        try { 
            const cursor = reviews_conn.find({movieId: parseInt(movieId)});
            return cursor.toArray();
        } catch (err) {
            console.error(`Unable to fetch reviews: ${err.stack}`);
            return {error: err};
        };
    };

    static async addReview(user, movieId, review) {
        try {
            const reviewDoc = {
                user: user,
                movieId: parseInt(movieId),
                review: review,
                date: new Date()
            }

            const response = await reviews_conn.insertOne(reviewDoc);
            return response;
        } catch (err) {
            console.error(`Unable to add review: ${err.stack}`);
            return {error: err.message};
        };
    };

    static async updateReview(reviewId, user, review) {
        try {
            const response = await reviews_conn.updateOne(
                {_id: new ObjectId(reviewId)},
                {$set: {user:user, review:review, date: new Date()}}
            );
            return response;
        } catch (err) {
            console.error(`Unable to update review: ${err.stack}`);
            return {error: err.message};
        };
    };

    static async getReview(reviewId) {
        try {
            return await reviews_conn.findOne({_id: new ObjectId(reviewId)});
        } catch (err) {
            console.error(`Unable to fetch review, ${err}`);
            return {error: err.message};
        };
    };

    static async deleteReview(reviewId) {
        try {
            const response = await reviews_conn.deleteOne({_id: new ObjectId(reviewId)});
            return response;
        } catch (err){
            console.error(`unable to delete review, ${err}`);
            return {error: err.message};
        }
    }
}