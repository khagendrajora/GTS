const express = require('express')
const { placeOrder, orderList } = require('../controller/ItemController')
const router = express.Router()


router.post('/placeOrder', placeOrder)
router.get('/orderList', orderList)

module.exports = router