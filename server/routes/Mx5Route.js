const express = require ('express')
const { addQ5, getQ5 } = require ('../controllers/Q5Controll')
const api = express.Router()

api.post('/q5', addQ5)
api.get('/q5', getQ5)

module.exports = api

