const mongoose = require ('mongoose')

async function connectdb ({url, atlas}){
    const uri = `${url}`
    await mongoose.connect(atlas)
}

mongoose.connection.on('open', () => console.log('AtlasDB Connect'))

module.exports = connectdb