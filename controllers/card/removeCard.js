const userDB = require('../../service/mongoDB/mongoDB');
const User = require('../../service/schema/schemaBD');

const removeCard = async (req, res, next) => {
    const {cardId} = req.query;
    const {email} = req.user;
    const data = req.body;
    const user = await userDB.findUser({email});
    
    const card = user?.cards.find((card)=> card._id.toString() === cardId.toString())
    
    const cardIndex = user?.cards.findIndex(
    (card) => card._id.toString() === cardId.toString());

    if (!card || cardIndex === undefined) {
        return res.status(400).send({ message: "Invalid 'cardId'" });
    }
    const CardsAll = user.cards;
    const removeCard = CardsAll.splice(cardIndex,1);

    await User.findOneAndUpdate({email: user.email}, {
        "$set": {
            "cards": CardsAll,
        }
    })

    res.status(200).json({message:removeCard}); 


};





module.exports = {
    removeCard,
};