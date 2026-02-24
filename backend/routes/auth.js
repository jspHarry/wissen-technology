const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');

router.post('/register', async (req,res)=>{
  try{
    const { name, email, password, batch } = req.body;
    if(!name || !email || !password) return res.status(400).json({msg:'Missing fields'});
    const hash = await bcrypt.hash(password,10);
    const user = await Employee.create({ name, email, password: hash, batch });
    res.json({ id: user._id, name: user.name, email: user.email, batch: user.batch });
  }catch(err){
    console.error(err);
    res.status(400).json({msg: 'Registration failed', error: err.message});
  }
});

router.post('/login', async (req,res)=>{
  try{
    const { email, password } = req.body;
    const user = await Employee.findOne({ email });
    if(!user) return res.status(400).json({msg:'No user'});
    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(400).json({msg:'Wrong password'});
    const token = jwt.sign({ id: user._id, batch: user.batch, name: user.name }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '8h' });
    res.json({ token });
  }catch(err){
    res.status(500).json({msg:'Login error'});
  }
});

module.exports = router;
