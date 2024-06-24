const Item = require('../models/Item')


exports.placeOrder = async (req, res) => {
    try {
        let data = new Item({
            itemName: req.body.itemName,
            price: req.body.price,
            weight: req.body.weight
        })
        data = await data.save()
        if (!data) {
            return res.status(400).json({ error: 'not uploaded' })
        } else {
            return (res.send(data))
        }

    }
    catch (error) {
        return res.status(400).json({ error: 'Items not uploaded', details: error });
    }
}

exports.orderList = async (req, res) => {
    try {

        const orderList = await Item.find()
        if (!orderList) {
            return res.status(400).json({ err: 'list not found' })
        } else {

            res.send(orderList)
        }


    } catch (error) {
        return res.status(400).json({ err: "failed to fetch" })
    }

}