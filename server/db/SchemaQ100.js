const mongoose = require ('mongoose')
const { Schema } = mongoose

const schemaQ100 = new Schema ({
    title: String,
    res1: String,
    valor1: Number,
    res2: String,
    valor2: Number,
    res3: String,
    valor3: Number,
    res4: String,
    valor4: Number,
    res5: String,
    valor5: Number
},{
    timestamps: true
})

module.exports = mongoose.model('Q100', schemaQ100)