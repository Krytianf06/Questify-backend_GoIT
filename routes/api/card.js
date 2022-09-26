const express = require('express')
const router = express.Router()

const {authorization} = require('../../service/valid/tokenValid');
const {getCards} = require('../../controllers/card/getCard');
const {editCard} = require('../../controllers/card/editCard');
const {addCard} = require('../../controllers/card/addCard');
const {removeCard} = require('../../controllers/card/removeCard');

router.get('/card',authorization, getCards);
router.post('/card', authorization, addCard);
router.patch('/card', authorization, editCard);
router.delete('/card',authorization,removeCard);


module.exports = router