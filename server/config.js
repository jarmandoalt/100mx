const config = {
    dbConfig:{
        url: process.env.DATABASE_URL,
        atlas: process.env.MONGO_URI
    }
}

module.exports = config