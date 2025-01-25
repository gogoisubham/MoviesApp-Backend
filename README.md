
# MoviesApp-Backend

A RESTful API built with Node.js and MongoDB for managing movie reviews and user profiles. It includes features for user authentication, profile management, and CRUD operations for reviews, secured with JSON Web Tokens (JWT).

## Features

- **User Management**
  - User registration and profile creation.
  - User authentication with JWT.
  - Update and delete user profiles (protected by JWT and role-based checks).

- **Movie Reviews**
  - CRUD operations for movie reviews.
  - Retrieve reviews for movies.

- **Security**
  - Password hashing using bcrypt.
  - Authentication and authorization using JWT.

## Project Structure
```plaintext
MoviesApp-Backend/
├── api/                    # API routes and controllers
│   ├── reviews.route.js    # Routes for reviews-related actions
│   ├── users.route.js      # Routes for user-related actions
│   ├── reviews.controller.js # Reviews controller logic
│   ├── users.controller.js   # Users controller logic
├── dao/                    # Data Access Objects (DB logic)
│   ├── reviewsDAO.js       # Reviews-related DB operations
│   ├── usersDAO.js         # Users-related DB operations
├── middleware/             # Middleware logic
│   ├── authenticateToken.js # Token authentication middleware
├── models/                 # Mongoose schemas
│   ├── User.js             # User schema definition
├── .env                    # Environment variables (not included in repo)
├── LICENSE                 # License file
├── package.json            # Project metadata and dependencies
├── index.js                # Entry point to the application
└── server.js               # Express app setup
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gogoisubham/MoviesApp-Backend.git
   cd MoviesApp-Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:
   ```plaintext
   MONGODB_USERNAME=<your_mongodb_username>
   MONGODB_PASSWORD=<your_mongodb_password>
   JWT_SECRET=<your_jwt_secret>
   PORT_NUMBER=<port_number>
   ```

4. Start the server:
   ```bash
   node index.js
   ```

5. The API will be accessible at `http://localhost:<PORT_NUMBER>`.

## API Endpoints

### Users
- **POST** `/movies-backend/v1/users/create` - Create a new user.
- **POST** `/movies-backend/v1/users/login` - User login (returns JWT).
- **GET** `/movies-backend/v1/users/get-profile` - Get user profile (requires valid token).
- **PUT** `/movies-backend/v1/users/update-user/:userId` - Update user profile (requires valid token).
- **DELETE** `/movies-backend/v1/users/delete-user/:userId` - Delete user profile (requires valid token).

### Reviews
- **GET** `/movies-backend/v1/reviews/movie/:id` - Retrieve all reviews for a specific movie.
- **POST** `/movies-backend/v1/reviews/new-review` - Create a new review.
- **GET** `/movies-backend/v1/reviews/:id` - Retrieve a specific review by its ID.
- **PUT** `/movies-backend/v1/reviews/:id` - Update a specific review by its ID.
- **DELETE** `/movies-backend/v1/reviews/:id` - Delete a specific review by its ID.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **Security**: Bcrypt for password hashing

## Future Enhancements

- Implement Role-Based Access Control (RBAC) for admin-specific features.
- Add testing using tools like Jest or Mocha.
- Improve API documentation (e.g., using Swagger).

## Contributing

Feel free to fork the repository and submit pull requests. All contributions are welcome!

## License

This project is licensed under the [MIT License](./LICENSE).

## Author
**Subham Gogoi**  
- *[GitHub Profile](https://github.com/gogoisubham)*