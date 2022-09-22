const cardDB = require('../../service/mongoDB/cardDB');


const getCards = async (req, res, next) => {
    const userData = await cardDB.getAllCards();
  try {
     if (userData) {
      const allCards = userData.cards

      res.status(200).json({cards:allCards}); 
      }
  } catch (e) {
    next(e);
  }
    
};



module.exports = {
    getCards,
};