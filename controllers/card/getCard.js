const cardDB = require('../../service/mongoDB/cardDB');


const getCards = async (req, res, next) => {
  const {email} = req.user;
  try {
    const user = await cardDB.getAllCards({email});

     if (user) {
      const allCards = user.cards
      
      res.status(201).json({cards:allCards}); 
      } else {
        res.status(201).json("Nic");
      }

  } catch (error) {
    next(error);
  }
    
};


module.exports = {
    getCards,
};