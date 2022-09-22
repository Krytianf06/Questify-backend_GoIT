const User = require('../schema/schemaBD');

const findUser = (item) => User.findOne(item).lean();

const createUser = (data) =>User.create(data);

const findAndUpdateUser = (id, IDtoken) => User.findByIdAndUpdate(id, IDtoken);

const findAndUpdate = (id, setID) => User.findOneAndUpdate(id, setID)

const findUserID = (data) => User.findById(data);

const Update = (id, data) => User.update(id,{$push:{cards:[data]}})

const putContact = (contactId, fields) => User.findOneAndUpdate(
    {
      cards: contactId,
    },
    {
      $set: fields,
    },
  );


module.exports = {
    findUser,
    createUser,
    findAndUpdateUser,
    findUserID,
    findAndUpdate,
    Update,
    putContact,
}; 