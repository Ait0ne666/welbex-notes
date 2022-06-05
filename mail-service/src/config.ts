import { Config } from "./models/config"

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}



const mailerPass = process.env.EMAIL_PASS 

if (!mailerPass) {
    throw new Error("No mailer pass in environment")
}


const config: Config = {
    mailerPass
}



export default config


