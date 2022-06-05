declare global {
    namespace Express {
        interface Request {
            context?: {
                userId: number 
            }
        }
    }
}
import {Request, } from 'express'
import {ParamsDictionary} from 'express-serve-static-core'



export interface ApiRequest<T, Q extends ParamsDictionary = {}> extends Request {
    body: T,
    params: Q,
}