const express = require('express')
const app = express()
require('dotenv').config()
require('./db/connection')
const bodyParser = require('body-parser')
const cors = require('cors');
app.use(cors());


const port = 7000


app.use(bodyParser.json())

const item = require('./routes/ItemRoute')

app.use('/api', item)




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})