const User = require('../schema/schemaBD');

const getAllCards = (item) => User.findOne(item).lean();

const createCard = (data) => User.create( data );

const removeCardDB = (index, cardAll) => User.findOneAndUpdate(index, cardAll);

const editCardDB = (index, card) => User.findOneAndUpdate(index, card);


module.exports = {
    getAllCards,
    createCard,
    removeCardDB,
    editCardDB,
};


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