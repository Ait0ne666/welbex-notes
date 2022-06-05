if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const auth = process.env.AUTH_HOST
const notes = process.env.NOTES_HOST


if (!auth || !notes) {
    throw new Error("Some environmental variables are missing")
}



interface Config {
    auth: string,
    notes: string    
}




export const config:Config = {
    auth,
    notes
} 



