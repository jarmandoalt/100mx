const mongoose = require ('mongoose')

mongoose.connection.on('open', () => console.log('db Connect'))

async function connectdb ({url}){
    const uri = `${url}`
    await mongoose.connect(uri)
}

module.exports = connectdb