const Item = require('../models/Item')


exports.placeOrder = async (req, res) => {
    const items = req.body.items
    try {
        const savedItems = await Promise.all(items.map(async (itemData) => {
            let item = new Item(itemData)
            return await item.save()
        }))
        return res.status(200).json(savedItems);
    } catch (error) {
        return res.status(400).json({ error: 'Items not uploaded', details: error });
    }

    // let item = new Item({
    //     itemName: req.body.itemName,
    //     price: req.body.price,
    //     weight: req.body.weight
    // })
    // item = item.save()
    // if (!item) {
    //     return res.status(400).json({ error: 'not uploaded' })

    // } else {
    //     return (res.send(item))
    // }
}