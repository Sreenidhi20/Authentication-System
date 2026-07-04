# Auth System

A full-stack authentication system with React + Vite frontend and Node.js + Express backend using MySQL for persistence.

## Features

- User registration with email and password
- Secure password hashing with bcrypt
- Login with JWT-based authentication
- Forgot password flow using OTP email verification
- Protected route example using JWT middleware
- MySQL database for users and password reset OTPs

## Project structure

- `Backend/` - Express server, MySQL connection, authentication routes, email OTP service
- `Frontend/` - React app built with Vite, pages for login, registration, forgot password, and home
- `MYSQL_Database.sql` - SQL script to create the database and tables

## Prerequisites

- Node.js 18+ or compatible version
- MySQL server
- Gmail account for sending password reset OTPs

## Backend setup

1. Open a terminal in `Backend/`
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in `Backend/` with the following values:

```env
DB_host=localhost
DB_user=your_mysql_username
DB_Name=AuthenticationSystem
DB_password=your_mysql_password
AppEMail=your.email@gmail.com
AppPassword=your_gmail_app_password
AccessTokenSecret=your_jwt_secret
```

4. Create the database and tables using `MYSQL_Database.sql`:

- Import the SQL file in your MySQL client, or run:

```bash
mysql -u your_mysql_username -p < "MYSQL_Database.sql"
```

5. Start the backend server:

```bash
node index.js
```

The backend listens on `http://localhost:3000`.

## Frontend setup

1. Open a terminal in `Frontend/`
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the URL shown in the terminal, typically `http://localhost:5173`

## API Endpoints

### Auth routes

- `POST /register`
  - Request body: `{ name, email, password }`
  - Registers a new user

- `POST /login`
  - Request body: `{ email, password }`
  - Returns `accessToken` on success

### Forgot password flow

- `POST /forgotpassword`
  - Request body: `{ email }`
  - Sends OTP to the user's email

- `POST /verifyotp`
  - Request body: `{ email, OTP }`
  - Verifies the OTP

- `POST /updatepassword`
  - Request body: `{ email, newPassword }`
  - Updates the user's password if valid

### Protected route example

- `GET /resticted-data`
  - Requires `Authorization: Bearer <token>` header
  - Returns basic user info if the JWT is valid

## Notes

- The frontend expects the backend API at `http://localhost:3000`.
- Gmail may require an app password or OAuth settings to allow nodemailer access.
- The backend uses `bcrypt` for password hashing and `jsonwebtoken` for JWT creation.
- Adjust CORS origin in `Backend/index.js` if you want to restrict allowed clients.

## License

This project is provided as-is. Update the license section as needed.
