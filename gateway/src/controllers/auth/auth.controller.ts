import axios, { AxiosError } from "axios";
import { log } from "../../server";
import { config } from "../../config";
import { ApiRequest } from "../../dto/api-request";
import { ApiResponse, ResBody } from "../../dto/api-response";
import { AuthorizationResultDTO } from "../../dto/authorization-response";
import { ChangePasswordDTO } from "../../dto/change-password-request";
import { RefreshRequestDTO } from "../../dto/refresh-request";
import { RegistrationDTO } from "../../dto/register-request";
import { Errors } from "../../models/errors/errors";

export interface IAuthController {



    register: (req: ApiRequest<RegistrationDTO>, res: ApiResponse<string>) => Promise<ApiResponse<string>>;



    login: (req: ApiRequest<RegistrationDTO>, res: ApiResponse<AuthorizationResultDTO>) => Promise<ApiResponse<AuthorizationResultDTO>>


    refresh: (req: ApiRequest<RefreshRequestDTO>, res: ApiResponse<AuthorizationResultDTO>) => Promise<ApiResponse<AuthorizationResultDTO>>

    changePassword: (req: ApiRequest<ChangePasswordDTO>, res: ApiResponse<string>) => Promise<ApiResponse<string>> 
}



class AuthController implements IAuthController {





    public register = async (req: ApiRequest<RegistrationDTO>, res: ApiResponse<string>): Promise<ApiResponse<string>> => {



        try {

            const response = await axios.post<ResBody<string>>(config.auth + '/auth/register', req.body)

            

            return res.status(200).send(response.data)



        } catch (e) {
            
            if (e instanceof AxiosError) {
                return res.status(e.response?.status ?? 500).send({
                    error: true,
                    message: e.response?.data.message
                })
            } else {
                log.error(e)
                return res.status(500).send({
                    error: true,
                    message:  Errors.server.message
                })
            }
        }


    }

    public login = async (req: ApiRequest<RegistrationDTO>, res: ApiResponse<AuthorizationResultDTO>): Promise<ApiResponse<AuthorizationResultDTO>> => {



        try {

            const response = await axios.post<ResBody<AuthorizationResultDTO>>(config.auth + '/auth/login', req.body)

            

            return res.status(200).send(response.data)



        } catch (e) {
            
            if (e instanceof AxiosError) {
                return res.status(e.response?.status ?? 500).send({
                    error: true,
                    message: e.response?.data.message
                })
            } else {
                log.error(e)
                return res.status(500).send({
                    error: true,
                    message:  Errors.server.message
                })
            }
        }
    }

    refresh = async (req: ApiRequest<RefreshRequestDTO>, res: ApiResponse<AuthorizationResultDTO>): Promise<ApiResponse<AuthorizationResultDTO>> => {

        const auth = req.headers.authorization


        try {

            const response = await axios.post<ResBody<AuthorizationResultDTO>>(config.auth + '/auth/refresh', req.body, {
                headers: auth ? {
                    Authorization: auth
                }: undefined
            })

            

            return res.status(200).send(response.data)



        } catch (e) {
            
            if (e instanceof AxiosError) {
                return res.status(e.response?.status ?? 500).send({
                    error: true,
                    message: e.response?.data.message
                })
            } else {
                log.error(e)
                return res.status(500).send({
                    error: true,
                    message:  Errors.server.message
                })
            }
        }

    }


    changePassword =  async(req: ApiRequest<ChangePasswordDTO>, res: ApiResponse<string>): Promise<ApiResponse<string>> => {
        const auth = req.headers.authorization


        try {

            const response = await axios.put<ResBody<string>>(config.auth + '/profile/password', req.body, {
                headers: auth ? {
                    Authorization: auth
                }: undefined
            })

            

            return res.status(200).send(response.data)



        } catch (e) {
            
            if (e instanceof AxiosError) {
                return res.status(e.response?.status ?? 500).send({
                    error: true,
                    message: e.response?.data.message
                })
            } else {
                log.error(e)
                return res.status(500).send({
                    error: true,
                    message: Errors.server.message
                })
            }
        }


    }

}



export default AuthController