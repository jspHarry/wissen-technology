📌 Project Overview

The Office Seat Booking System is a full-stack web application that allows employees to manage office seat reservations based on their assigned batch and working schedule.

The system automatically:

Detects the employee’s batch from the backend

Calculates the current week of the month (1–7 → Week 1, 8–14 → Week 2, etc.)

Determines whether today is a working or non-working day

Reserves seats automatically on working days

Allows booking only floater seats on non-working days

Displays remaining floater seat count dynamically

This project demonstrates backend-driven business logic, role-based control, and real-world seat allocation constraints.

## 📸 Project Screenshot

<p align="center">
  <img src="dashboard.png" width="800"/>
</p>

🏗️ Tech Stack
Frontend

React.js

Axios

CSS

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

📂 Project Structure
backend/
  models/
  routes/
  utils/
  server.js

frontend/
  pages/
  Dashboard.js
  Login.js
  Register.js
⚙️ Core Business Logic
🗓 Week Calculation

The system calculates the week of the month dynamically:

Days 1–7 → Week 1

Days 8–14 → Week 2

Days 15–21 → Week 3

Days 22–28 → Week 4

Days 29–31 → Week 5

👥 Batch Logic

Employees are divided into two batches:

Batch	Working Days
Batch 1	Monday – Wednesday
Batch 2	Thursday – Saturday
🪑 Seat Rules

Total seats: 50

Seats 1–40 → Reserved seats (for working day employees)

Seats 41–50 → Floater seats (for non-working day booking)

Working Day

Seat is automatically reserved

Employee can only release the seat

Booking new seats is disabled

Non-Working Day

Employee can book only floater seats

Cannot book reserved seats

Floater seat count is limited to 10

🔐 Authentication

JWT-based authentication

Token stored in localStorage

Backend validates token for all protected routes

📡 API Endpoints
Authentication
POST /api/auth/login
POST /api/auth/register
Dashboard
GET /api/dashboard-info?date=YYYY-MM-DD

Returns:

{
  date,
  week,
  batch,
  isWorkingDay,
  seatStatus,
  remainingFloaterSeats
}
Bookings
GET    /api/bookings/:date
GET    /api/bookings/mine/:date
POST   /api/bookings
DELETE /api/bookings/:id
🚀 How to Run the Project
1️⃣ Clone Repository
git clone <repo-url>
2️⃣ Backend Setup
cd backend
npm install
npm start

Make sure MongoDB is running.

3️⃣ Frontend Setup
cd frontend
npm install
npm start

Frontend runs on:

http://localhost:3000

Backend runs on:

http://localhost:5000
🎯 Key Features

Dynamic working day detection

Backend-driven seat allocation logic

Real-time floater seat availability

Date-based booking system

Clean and responsive dashboard

Secure route protection using JWT

🧠 What This Project Demonstrates

Role-based business logic implementation

Date-based conditional rendering

Resource allocation constraints

Backend validation over frontend trust

Real-world seat management workflow

📌 Future Improvements

Automatic seat assignment on working day login

Concurrency control for last-seat booking

Admin dashboard for weekly analytics

Email notifications for bookings

Calendar-based visual seat planner
