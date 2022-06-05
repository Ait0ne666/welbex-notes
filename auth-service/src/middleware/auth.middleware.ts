import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import config from "../config";
import { JwtTokenPayload } from "../models/jwt-payload";




export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const headers = req.headers


    

    const authHeader = headers.authorization

    const parts = authHeader?.split(" ")

    if (!parts || parts.length < 2) {
        res.status(403).send({
            error: true,
            message: "Unauthorized"
        })
    } else {
        try {
            const payload = jwt.verify(parts[1], config.jwtSecret) as JwtTokenPayload
    
    
            if (!payload.id) {
                res.status(403).send({
                    error: true,
                    message: "Unauthorized"
                })
            } else {
                req.context = {
                    userId: payload.id
                }
    
                next()
    
            }

        } catch (err) {
            res.status(403).send({
                error: true,
                message: "Unauthorized"
            })   
        }



    }

}