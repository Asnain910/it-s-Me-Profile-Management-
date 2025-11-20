Cerope – MERN Stack Assignment

A fully responsive MERN Stack project implementing Login, Signup, Setup, and My Profile pages using React, Node.js, Express, MongoDB, Tailwind CSS, and JWT Authentication.
This project fulfills all requirements for the Cerope MERN Developer Intern Assignment.

Features
Authentication
Secure Login & Signup
JWT-based authentication & authorization
Protected routes (Profile, Setup Page)

Frontend (React + Tailwind)
Fully responsive pages (Web + Mobile)
Pixel-perfect UI based on the provided Figma design
Pages implemented:
Login Page
Register Page
Setup Page (User onboarding)
My Profile Page

Profile Setup
Upload/select profile picture (Avatar picker)
Save personal details
Style preference selection
DOB, location, country fields
Form validation
Smooth UI interactions

Backend (Node + Express + MongoDB)

JWT authentication middleware
REST APIs for:
Register user
Login user
Update profile
Get logged-in user
MongoDB used for data persistence

 Tech Stack
Frontend
React.js
React Router
Axios
Tailwind CSS
Vite / CRA (whichever you used)

Backend
Node.js
Express.js
MongoDB
Mongoose
JWT / bcryptjs

Installation & Setup
1️⃣ Clone the repo
git clone https://github.com/YOUR-USERNAME/CEROPE
cd CEROPE

🖥 Backend Setup
cd backend
npm install

Create .env file:
MONGO_URI=mongodb://127.0.0.1:27017/Mproject
JWT_SECRET=yourSecretKey
PORT=5000

Start backend
npm start

🌐 Frontend Setup
cd frontend
npm install
npm start


Your app runs on:

Frontend → http://localhost:3000
Backend  → http://localhost:5000

🔒 Authentication Flow
Signup → Save user + JWT  
Login → Get token  
Setup → Update profile  
My Profile → Fetch user with token  

Axios automatically attaches the token through an interceptor.

