🛒 MERN Add-to-Cart App with Auth & Role-Based Access
A simple MERN stack project that demonstrates an Add to Cart feature with user authentication, role-based access control, and Bootstrap UI. This project includes:

User Signup/Login

Add to Cart functionality

Product Management

Protected Routes via Middleware

Role-based UI using React Context

Auth token validation using cookies

🛠 Tech Stack
Frontend
React.js

Context API (for auth and role handling)

Bootstrap (for UI components)

React Router DOM

Backend
Node.js + Express

MongoDB + Mongoose

bcrypt (for password hashing)

JWT + Cookies (for authentication)

Custom Middleware (for route protection)# React-Node-Cart


💻 Frontend Behavior
Authenticated users can:

View the cart

Add products to the cart

Unauthenticated users:

Cannot see the cart icon

Will be redirected to /login if they try to access protected pages