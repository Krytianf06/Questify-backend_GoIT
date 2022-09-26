const userDB = require('../../service/mongoDB/mongoDB');
const cardDB = require('../../service/mongoDB/cardDB');


const removeCard = async (req, res, next) => {
    const {cardId} = req.query;
    const {email} = req.user;
    const data = req.body;
    try {
        const user = await userDB.findUser({email});
    
    const card = user?.cards.find((card)=> card._id.toString() === cardId.toString())
    
    const cardIndex = user?.cards.findIndex(
    (card) => card._id.toString() === cardId.toString());

    if (!card || cardIndex === undefined) {
        return res.status(400).send({ message: "Invalid 'cardId'" });
    }
    const CardsAll = user.cards;
    const removeCard = CardsAll.splice(cardIndex,1);

    await cardDB.removeCardDB({email: user.email}, {
        "$set": {
            "cards": CardsAll,
        }
    })

    res.status(200).json({message:removeCard}); 
        
    } catch (error) {
        next(error);
    }
    
};


module.exports = {
    removeCard,
};