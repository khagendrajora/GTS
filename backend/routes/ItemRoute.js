const express = require('express')
const { placeOrder } = require('../controller/ItemController')
const router = express.Router()


router.post('/placeOrder', placeOrder)

module.exports = router