const router = require('express').Router();
const auth = require('../middleware/auth');
const Booking = require('../models/booking');
const Seat = require('../models/seat');
const Leave = require('../models/leave');
const { isWorkingDay } = require('../utils/weekLogic');

// Create a booking by seatNumber (1-50)
router.post('/', auth, async (req,res)=>{
  try{
    const { seatNumber, date } = req.body;
    if(!seatNumber || !date) return res.status(400).json({msg:'Missing seatNumber or date'});

    // check leave
    const onLeave = await Leave.findOne({ employee: req.user.id, startDate: { $lte: date }, endDate: { $gte: date } });
    if(onLeave) return res.status(400).json({msg:'You are on leave that day'});

    const seat = await Seat.findOne({ seatNumber });
    if(!seat) return res.status(400).json({msg:'Seat not found'});

    // batch rules for reserved seats
    if(seat.type === 'RESERVED'){
      if(!isWorkingDay(req.user.batch, date)) return res.status(400).json({msg:'Reserved seats allowed only on your working days'});
    } else {
      // floater: limit 10 per day
      const floaterCount = await Booking.countDocuments({ date, status: 'BOOKED', seatNumber: { $gte: 41 } });
      if(floaterCount >= 10) return res.status(400).json({msg:'All floater seats booked for that day'});
    }

    const booking = await Booking.create({ employee: req.user.id, seat: seat._id, seatNumber, date });
    res.json(booking);
  }catch(err){
    console.error(err);
    if(err.code === 11000) return res.status(400).json({msg:'Seat already booked or you already have a booking for that date'});
    res.status(500).json({msg:'Booking failed', error: err.message});
  }
});

// Get bookings for a date
router.get('/:date', auth, async (req,res)=>{
  const bookings = await Booking.find({ date: req.params.date, status: 'BOOKED' }).populate('employee').populate('seat');
  res.json(bookings);
});

// Get my bookings
router.get('/mine/:date', auth, async (req,res)=>{
  const bookings = await Booking.find({ date: req.params.date, employee: req.user.id }).populate('seat');
  res.json(bookings);
});

// Cancel booking by id (soft cancel)
router.delete('/:id', auth, async (req,res)=>{
  const b = await Booking.findById(req.params.id);
  if(!b) return res.status(404).json({msg:'Booking not found'});
  if(String(b.employee) !== String(req.user.id)) return res.status(403).json({msg:'Not allowed'});
  b.status = 'CANCELLED';
  await b.save();
  res.json({msg:'Cancelled'});
});

module.exports = router;
