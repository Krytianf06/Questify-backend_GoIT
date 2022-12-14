const jwt = require('jsonwebtoken');
const userDB = require('../../service/mongoDB/mongoDB');


const authorization = async (req, res, next) =>{
  const token = req.headers['authorization']?.split(' ')[1];
  
  try {
  if(!token){
      return res.status(400).json({message:"No token provided" });
     }
    const { id } = jwt.verify(token, process.env.SECRET);
    const user = await userDB.findUserID(id);
    if (!user || token !== user.token) {
      res.status(401).json({message:"Not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }

};



module.exports = {
    authorization,
};