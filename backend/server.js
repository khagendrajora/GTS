const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors');
app.use(cors());


const port = 7000


app.use(bodyParser.json())





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})