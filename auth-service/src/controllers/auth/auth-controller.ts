import { ApiRequest } from "../../dto/api-request";
import { ApiResponse } from "../../dto/api-response";
import { RegistrationDTO } from "../../dto/register-request";
import { AuthorizationResultDTO } from "../../dto/authorization-response";
import validator from 'validator'
import { IAuthService } from "../../services/auth/auth.service";
import { RefreshRequestDTO } from "../../dto/refresh-request";
import { log } from "../../server";
import { Errors } from "../../models/errors/errors";





export interface IAuthController {

    authService: IAuthService

    register: (req: ApiRequest<RegistrationDTO>, res: ApiResponse<string>) => Promise<ApiResponse<string>>;

    login: (req: ApiRequest<RegistrationDTO>, res: ApiResponse<AuthorizationResultDTO>) => Promise<ApiResponse<AuthorizationResultDTO>>

    refresh: (req: ApiRequest<RefreshRequestDTO>, res: ApiResponse<AuthorizationResultDTO>) => Promise<ApiResponse<AuthorizationResultDTO>>
}



class AuthController implements IAuthController {

    authService: IAuthService;


    constructor(auth: IAuthService) {
        this.authService = auth
    }



    public register = async (req: ApiRequest<RegistrationDTO>, res: ApiResponse<string>): Promise<ApiResponse<string>> => {


        const { email, password } = req.body

        if (!email || !validator.isEmail(email)) {

            return res.status(400).send({
                error: true,
                message: Errors.email.message
            })
        }


        if (!password) {
            return res.status(400).send({
                error: true,
                message: Errors.password.message
            })
        }

        try {
            await this.authService.registerUser(email, password)


            return res.status(200).send({
                error: false,
                message: "Registration success"
            })

        } catch (e) {
            log.info(e)
            return res.status(400).send({
                error: true,
                message: e.message
            })
        }


    }

    public login = async (req: ApiRequest<RegistrationDTO>, res: ApiResponse<AuthorizationResultDTO>): Promise<ApiResponse<AuthorizationResultDTO>> => {



        const { email, password } = req.body



        if (!email || !password || !validator.isEmail(email)) {
            return res.status(400).send({
                error: true,
                message: Errors.invalidCredentials.message
            })
        }

        try {
            const tokens = await this.authService.login(email, password)

            return res.status(200).send({
                error: false,
                data: tokens
            })

        } catch (e) {
            log.info(e)
            return res.status(400).send({
                error: true,
                message: e.message
            })
        }
    }

    refresh = async (req: ApiRequest<RefreshRequestDTO>, res: ApiResponse<AuthorizationResultDTO>): Promise<ApiResponse<AuthorizationResultDTO>> => {

        const auth = req.headers.authorization
        const { refresh } = req.body


        if (!auth || !refresh) {
            return res.status(403).send({
                error: true,
                message: Errors.unauthorized.message
            })
        }

        try {
            const result = this.authService.refresh(auth.replace("Bearer ", ""), refresh)


            return res.status(200).send({
                error: false,
                data: result
            })
        } catch (e) {
            log.info(e)
            return res.status(400).send({
                error: true,
                message: e.message
            })
        }

    }

}



export default AuthController