import { Config } from "./models/config"

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


let jwtSecret = process.env.JWT_SECRET 
let refreshSecret = process.env.REFRESH_SECRET
const dbString = process.env.DB_STRING 
const broker = process.env.BROKER
const topic = process.env.TOPIC

if (!jwtSecret  ||  !refreshSecret || !dbString || !broker || !topic) {
    throw new Error("Some environment variables are missing")
}


const config: Config = {
    dbString,
    jwtSecret,
    refreshSecret,
    broker,
    topic
}



export default config


