const userDB = require('../../service/mongoDB/mongoDB')
const valid = require('../../service/valid/valid');



const addCard = async (req, res, next) => {
    try {
      const { error } = valid.cardValid.validate(req.body)
      const { email, _id  } = req.user;
      if (error) {
        res.status(403).json({message: error});
        
      } else {

        const result = await userDB.Update({_id}, req.body )
        const user = await userDB.findUser({email});
        const lastCardsCreated= user.cards.length -1;
        const lastCard = user.cards[lastCardsCreated];

        if (result) {
          res.status(201).json({
            createdCard:lastCard,
          });
        }
 
      }
    } catch (error) {
      next(error);
    }
};



module.exports = {
    addCard,
};