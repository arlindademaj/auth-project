# Auth Project

A production-ready REST API for user authentication built with Node.js, Express, and MongoDB. Features secure password hashing, JWT-based authentication, and protected routes following MVC architecture.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
- **Environment Variables:** dotenv

---

## Features

- User registration with validation
- Secure login with JWT token generation
- Password hashing with bcrypt
- Protected routes with JWT middleware
- View and update user profile
- MVC folder structure for clean, maintainable code

---

## Folder Structure

```
auth-project/
├── src/
│   ├── config/         # Database connection
│   ├── controllers/    # Route logic
│   ├── middleware/     # Auth middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Route definitions
│   └── utils/          # Helper functions
├── .env
├── .gitignore
├── server.js
└── package.json
```

---

## Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/auth-project.git
cd auth-project
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Run the development server

```bash
npm run dev
```

---

## API Endpoints

All routes are prefixed with `/api/auth`

| Method | Endpoint    | Description                  | Protected |
|--------|-------------|------------------------------|-----------|
| POST   | /register   | Register a new user          | No        |
| POST   | /login      | Login and receive JWT token  | No        |
| GET    | /profile    | Get current user profile     | Yes       |
| PUT    | /profile    | Update current user profile  | Yes       |

### Authentication Header

For protected routes, include the JWT token in the request header:

```
Authorization: Bearer <your_token>
```

---

## Request Examples

### Register

```json
POST /api/auth/register
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Login

```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "123456"
}
```

---

## Security

- Passwords are hashed using bcryptjs with 10 salt rounds
- JWT tokens expire after 7 days
- Protected routes require a valid token
- Passwords are never returned in API responses
- Invalid email and wrong password return the same error to prevent user enumeration

---

## Author

Built by Arlind — Junior Backend Developer
