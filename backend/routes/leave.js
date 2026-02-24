const router = require('express').Router();
const auth = require('../middleware/auth');
const Leave = require('../models/leave');
const Booking = require('../models/booking');

router.post('/', auth, async (req,res)=>{
  try{
    const { startDate, endDate, reason } = req.body;
    if(!startDate || !endDate) return res.status(400).json({msg:'Missing dates'});
    const leave = await Leave.create({ employee: req.user.id, startDate, endDate, reason });
    await Booking.updateMany(
      { employee: req.user.id, date: { $gte: startDate, $lte: endDate } },
      { status: 'AUTO_CANCELLED' }
    );
    res.json(leave);
  }catch(err){
    res.status(500).json({msg:'Leave request failed'});
  }
});

module.exports = router;
