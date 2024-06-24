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
    // try {
    //     const savedItems = await Promise.all(items.map(async (itemData) => {
    //         let item = new Item(itemData)
    //         return await item.save()
    //     }))
    //     return res.status(200).json(savedItems);
    // } catch (error) {
    //     return res.status(400).json({ error: 'Items not uploaded', details: error });
    // }

}