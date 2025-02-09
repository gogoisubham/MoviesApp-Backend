import UserModel from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class UsersDAO {
    static async isUserValid(username, email) {
        try{
            const existing_username = await UserModel.findOne({username});
            const existing_email = await UserModel.findOne({email});
            if (existing_username){
                return {valid:false, message:`The username '${username}' already exists. Try a different username.`};
            }
            else if (existing_email) {
                return {valid:false, message:`The email '${email}' already exists. Try a different email.`};
            }
            return {valid:true};
        } catch (err) {
            console.error(`Unable to validate user details: ${err}`);
            throw new Error ("Unable to validate user");
        };
    };

    static async findUser (userId) {
        try {
            const userExists = await UserModel.exists({_id:userId});
            return userExists ? true : false;
        } catch (e) {
            console.error(`Error finding user with id: ${userId}, ${e.message}`);
            throw new Error(`Error finding user with id: ${userId}, ${e.message}`);
        };
    };

    static async saveNewUser (username, email, password, role) {
        try {
            const newUser = new UserModel({
                username,
                email,
                password,
                role
            });
            const savedUser = await newUser.save();
            return {status: "success", userId: savedUser._id};
        } catch (err) {
            console.error(`Error saving new user: ${err}`);
            return {status: "failure", error: err.message};
        };
    };

    static async userLogin (email, password) {
        // check if user exists
        try {
            const user = await UserModel.findOne({email});
            if (!user) {
                return {success:false, message:`${email} does not exist. Try signing up.`};
            }
            const password_validity = await bcrypt.compare(password, user.password);
            if (!password_validity) {
                return {success:false, message:"Invalid password"};
            }
            try {
                const token = jwt.sign(
                    {userId:user._id, email:user.email, role:user.role},
                    process.env.JWT_SECRET,
                    {expiresIn:"1h"}
                );
                return {success:true, message:"Login successful", token};
            } catch (err) {
                console.error(`Error while generating token: ${err}`);
                throw new Error("Error while generating token");
            }
        } catch (e) {
            console.error(`Caught an error while logging in user: ${e}`);
            throw new Error("Login failed");
        };
    };

    static async getProfile (userId) {
        try {
            const profile = await UserModel.findOne({_id:userId}, '-email -password');
            if (!profile) {
                return {success:false, message:"User doesn't exist"};
            };
            return {success:true, message:profile};
        } catch (err) {
            console.error(`Error retreiving user profile: ${err}`);
            return {success:false, message:"Error retrieving user profile" };
        };
    };

    static async updateUser(userId, username, password){
        try {
            const updates = {}; // Holds the fields that needs to be updated
            if(username){
                updates.username = username;
            };

            if(password){
                const salt = await bcrypt.genSalt(10);
                updates.password = await bcrypt.hash(password, salt);
            };

            if(Object.keys(updates).length === 0){
                throw new Error("No fields provided to update!");
            };

            const response =  await UserModel.updateOne({_id:userId},{$set:updates});
            if(response.matchedCount === 0){
                throw new Error(`User not found!`);
            };
            return response;
        } catch (err) {
            console.error(`Error trying to update user, ${err}`);
            throw new Error(`Failed to update user: ${err.message}`);
        };
    };

    static async deleteUser(userId){
        try {
            const response = await UserModel.deleteOne({_id:userId});
            if(response.deletedCount === 0){
                throw new Error(`User not found!`);
            };
            return response;
        } catch (err) {
            console.error(`Error trying to delete user, ${err}`);
            throw new Error(`Failed to delete user: ${err.message}`);
        };
    };
};