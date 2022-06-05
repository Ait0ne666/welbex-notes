import { Response } from "express";
import { Send } from 'express-serve-static-core';



export interface ResBody<T> {
    error: boolean,
    message?: string | string[],
    data?: T,
}


export interface ApiResponse<T> extends Response {


    send: Send<ResBody<T>, this>
}


