import UsersDAO from '../dao/usersDAO.js';

export default class UsersCtrl {
    static async createUser(req, res, next) {
        try{
            const {username, email, password, role} = req.body;

            const validity = await UsersDAO.isUserValid(username, email);
            if(!validity.valid){
                return res.status(400).json({message:validity.message});
            }
        
            const postResponse = await UsersDAO.saveNewUser(username, email, password, role);
            if(postResponse.status === "success"){
                return res.status(201).json({message:"User created succesfully", data: postResponse});
            }
            return res.status(400).json({message:"User creation unsuccessful", postResponse});
        } catch (err) {
            console.error(`Caught an error while creating new user: ${err}`);
            return res.status(500).json({error: "Unable to create user. Please try again later."});
        };
    };

    static async login (req, res, next) {
        try {
            let email = req.body.email;
            let password = req.body.password;

            if (!email || !password) {
                return res.status(400).json({status:'fail', message:'Missing required fields'});
            }
            const login_result = await UsersDAO.userLogin(email, password);
            if (!login_result.success) {
                return res.status(401).json(login_result);
            }
            return res.status(200).json(login_result);
        } catch (err) {
            console.error(`Error in login middleware: ${err}`);
            return res.status(500).json({ status: 'error', message: 'Internal server error' });
        };
    };

    static async getUserProfile (req, res, next) {
        try {
            const userId = req.user.userId;
            const result = await UsersDAO.getProfile(userId);
            if (!result.success) {
                return res.status(404).json({status:'fail', message:result.message});
            }
            res.status(200).json({status:'success', message:result.message});
        } catch (e) {
            console.error(`Internal server error: ${e}`);
            res.status(500).json({status:'fail', error:`Internal server error:${e.message}`});
        };
    };

    static async updateUserProfile (req, res, next){
        try {
            const userId = req.params.userId;
            if(req.user.userId !== req.params.userId){
                return res.status(403).json({status:'fail', message:'You are not authorized to update this profile'});
            };
            const {username, password} = req.body;
            if(!userId){
                return res.status(400).json({status:'fail', message:'Missing userId'});
            };

            if(!username && !password){
                return res.status(400).json({status:'fail', message:'Missing required fields. Nothing to update.'});
            };

            const updateResult = await UsersDAO.updateUser(userId, username, password);
            return res.status(200).json({status:'success', 
                message:'User profile updated successfully',
                data:updateResult});
        } catch (err) {
            console.error(`Error updating user profile: ${err.message}`);
            return res.status(500).json({status:'Internal server error', message: err.message});
        };
    };

    static async deleteUserProfile(req, res, next){
        try {
            const userId = req.params.userId;
            if(!userId){
                return res.status(400).json({status:'fail', message:'Missing userId'});
            };

            const response = await UsersDAO.findUser(userId);
            if(!response.userExists){
                return res.status(404).json({status:'fail', message:"User not found"});
            };
            
            if(req.user.userId !== req.params.userId){
                return res.status(403).json({status:'fail', message:'You are not authorized to delete this profile'});
            };
            await UsersDAO.deleteUser(userId);
            return res.status(200).json({status:'success', 
                message:"User profile deleted successfully"});
        } catch (err) {
            if (err.message === 'User not found!') {
                return res.status(404).json({ status: 'fail', message: 'User not found!' });
            }
            console.error(`Error deleting user profile: ${err.message}`);
            return res.status(500).json({status:'Internal server error', message: err.message});
        };
    };
};