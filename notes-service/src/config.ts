import { Config } from "./models/config"

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


let jwtSecret = process.env.JWT_SECRET 
const dbString = process.env.DB_STRING 

if (!jwtSecret  || !dbString) {
    throw new Error("No jwt secrets in environment")
}


const config: Config = {
    dbString,
    jwtSecret,
  
}



export default config


