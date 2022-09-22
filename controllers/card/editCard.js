const userDB = require('../../service/mongoDB/mongoDB');
const User = require('../../service/schema/schemaBD');



const editCard = async (req, res, next) => {
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
    
    // console.log(id);
    
    const newCard = {...card, ...req.body};
    // User.findOneAndUpdate()
    // const result = await userDB.putContact({cardId}, newCard);
    // console.log(newCard);

    // await User.findOneAndUpdate({email: user.email}, {
    //     "$set": {
    //         "cards.$[e1]": data,
    //     }
    // }, {
    //     arrayFilters: [
    //         {
    //             "e1._id": cardId,
    //         }
    //     ]
    // })


    await User.findOneAndUpdate({email: user.email, "cards._id": cardId}, {
        "$set": {
            "cards.$": data,
        }
    })

    res.status(200).json({message:newCard}); 
};



module.exports = {
    editCard,
};