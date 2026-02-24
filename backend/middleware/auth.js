const jwt = require('jsonwebtoken');
module.exports = function(req,res,next){
  const auth = req.header('Authorization');
  if(!auth) return res.status(401).json({msg:'No token'});
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth;
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.user = decoded;
    next();
  }catch(err){
    res.status(401).json({msg:'Invalid token'});
  }
};
