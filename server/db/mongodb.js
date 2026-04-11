const mongoose = require ('mongoose')

async function connectdb ({url, atlas}){
    const uri = `${url}`, 
    atlasUri = "mongodb+srv://altamiraarmando_db_user:CGvs14RXuZnjhSdT@100mx.s9rqfye.mongodb.net/?appName=100mx"
    await mongoose.connect(atlasUri)
}

mongoose.connection.on('open', () => console.log('AtlasDB Connect'))

module.exports = connectdb