import { Response } from "express";
import { Send } from 'express-serve-static-core';



interface ResBody<T> {
    error: boolean,
    message?: string,
    data?: T,
}


export interface ApiResponse<T> extends Response {


    send: Send<ResBody<T>, this>
}


