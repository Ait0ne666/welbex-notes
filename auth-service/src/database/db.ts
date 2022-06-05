import {Sequelize} from 'sequelize'
import config from '../config';

import User from '../models/user/user'








const sequelize = new Sequelize(config.dbString, {
    pool: {
        max: 5,
        min: 0,
    },
    })

export const connectToDatabase = async (callback: () => void) => {
    const maxTries = 5;
    const timeout = 1000;

    let currentTry = 0;


    while (currentTry < maxTries) {

        try {
            await sequelize.authenticate()
            
            console.log("Successfully connected to Postgres")
            break
        } catch (err) {
            currentTry ++
            await new Promise((res) => {
                setTimeout(() => {
                    res(null)
                }, timeout)
            })
            console.log("Trying to connect attempt: "+ currentTry + " " + err)
            continue
        }
    }


    if (currentTry ===  maxTries) {
        return
    }


    callback()
}


export default sequelize


