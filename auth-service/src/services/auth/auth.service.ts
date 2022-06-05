import { AuthorizationResultDTO } from "../../dto/authorization-response";
import { IUserRepository } from "../../repositories/user/user.repository";
import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JwtTokenPayload } from "../../models/jwt-payload";
import config from "../../config";
import { CompressionTypes, Producer } from "kafkajs";
import { Errors } from "../../models/errors/errors";






export interface IAuthService {
    repository: IUserRepository,


    registerUser: (email: string, password: string) => Promise<void>

    login: (email: string, password: string) => Promise<AuthorizationResultDTO>


    changePassword: (old: string, newpass: string, id: number) => Promise<void>

    refresh: (auth: string, refresh: string) => AuthorizationResultDTO

}



class AuthService implements IAuthService {

    repository: IUserRepository;
    producer: Producer

    constructor(rep: IUserRepository, producer: Producer) {
        this.repository = rep

        this.producer = producer
    }



    public registerUser = async (email: string, password: string): Promise<void> => {


        var userExist = await this.repository.getUserByEmail(email)


        if (userExist != null) {
            throw Errors.userExist
        }

        const hashedPassword = await this.encryptPassword(password)


        const user = await this.repository.createUser(hashedPassword, email)


        this.sendMail(user.email)
  
    }


    public login = async (email: string, password: string): Promise<AuthorizationResultDTO> => {



        const user = await this.repository.getUserByEmail(email)


        if (!user) {
            throw Errors.invalidCredentials
        }


        const passMatch = await this.comparePassword(password, user.password)


        if (!passMatch) {
            throw Errors.invalidCredentials
        }


        const tokens = this.generateTokens(user.id)



        return tokens
    }



    public changePassword = async (old: string, newpass: string, id: number): Promise<void> => {


        const user = await this.repository.getUserById(id)


        if (!user) {
            throw Errors.unauthorized
        }

        const passMatch = await this.comparePassword(old, user.password)


        if (!passMatch) {
            throw Errors.unauthorized
        }


        const newPassHash = await this.encryptPassword(newpass)


        const updated = await this.repository.updateUser(id, {
            password: newPassHash
        })


        if (!updated) {
            throw Errors.userUpdate
        }

    }

    public refresh = (auth: string, refresh: string): AuthorizationResultDTO => {

        const id = this.verifyTokens(auth, refresh)



        if (!id) {
            throw Errors.unauthorized
        }



        const tokens = this.generateTokens(id)




        return tokens


    }

    encryptPassword = async (password: string): Promise<string> => {


        return hash(password, 10)
    }


    comparePassword = async (password: string, encrypted: string): Promise<boolean> => {


        return compare(password, encrypted)
    }



    generateTokens = (id: number): { jwt: string, refresh: string } => {
        const payload: JwtTokenPayload = {
            id: id
        }

        const token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: "1h"
        })




        const refresh = jwt.sign(payload, config.refreshSecret, {
            expiresIn: "90d"
        })


        return {
            jwt: token,
            refresh: refresh
        }
    }


    verifyTokens = (auth: string, refresh: string): number | null => {

        try {
            const jwtPayload: any = jwt.verify(auth, config.jwtSecret, {
                ignoreExpiration: true
            })

            const refreshPayload: any = jwt.verify(refresh, config.refreshSecret)

            if (refreshPayload.id !== jwtPayload.id) {
                return null
            }


            return jwtPayload.id
        } catch (e) {
            return null
        }


    }

    sendMail = async (email: string) => {
        const msg = {
            email: email,
            mail_type: 'registration'
        }


        this.producer
            .send({
                topic: config.topic,
                compression: CompressionTypes.GZIP,
                messages: [{
                    key: 'mail',
                    value: JSON.stringify(msg)
                }]
            })
    }

}




export default AuthService


