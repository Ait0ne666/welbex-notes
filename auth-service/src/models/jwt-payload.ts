import jwt from 'jsonwebtoken'


export type JwtTokenPayload = jwt.JwtPayload & {
    id: number
}