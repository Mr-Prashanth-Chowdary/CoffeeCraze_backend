require('dotenv').config()

baseURL = 'http://localhost:3002'
const MONGODB_URI = process.env.DB_URL

module.exports = {baseURL, MONGODB_URI}
