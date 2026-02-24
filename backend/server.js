require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Seat = require('./models/seat');

const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const leaveRoutes = require('./routes/leave');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async ()=>{
  console.log("Mongo Connected");
  // Seed seats if none
  const count = await Seat.countDocuments();
  if(count === 0){
    const seats = [];
    // 1..40 reserved, 41..50 floater
    for(let i=1;i<=50;i++){
      seats.push({seatNumber:i, type: i<=40 ? 'RESERVED' : 'FLOATER'});
    }
    await Seat.insertMany(seats);
    console.log("Seeded seats");
  }
}).catch(err=>console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/leaves', leaveRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log("Server running on", PORT));
