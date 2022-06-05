declare global {
    namespace Express {
        interface Request {
            context?: {
                userId: number 
            }
        }
    }
}
import {Request} from 'express'




export interface ApiRequest<T> extends Request {
    body: T,
}