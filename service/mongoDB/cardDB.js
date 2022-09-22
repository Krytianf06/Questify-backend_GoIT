const User = require('../schema/schemaBD');

const getAllCards = (item) => User.findOne(item).lean();

const createCard = (data) => User.create( data );


module.exports = {
    getAllCards,
    createCard,
};