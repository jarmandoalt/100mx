const express = require ('express')
const { addQ100, getQ100 } = require ('../controllers/Q100Controll')
const api = express.Router()

api.post('/q100', addQ100)
api.get('/q100', getQ100)

module.exports = api