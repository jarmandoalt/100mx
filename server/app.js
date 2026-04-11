const express = require ('express')
const cors = require ('cors')
const Mx100Route = require ('./routes/Mx100Route')
const Mx5Route = require ('./routes/Mx5Route')
const app = express()

app.use(cors())
app.use(express.urlencoded())
app.use(express.json())

app.use('/v1', Mx100Route)
app.use('/v1', Mx5Route)

module.exports = app