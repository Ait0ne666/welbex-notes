import { ApiRequest } from "../../dto/api-request";
import { ApiResponse } from "../../dto/api-response";
import { ChangePasswordDTO } from "../../dto/change-password-request";
import { log } from "../../server";
import { IAuthService } from "../../services/auth/auth.service";
import { Errors } from "../../models/errors/errors";

export interface IProfileController {
    authService: IAuthService



    changePassword: (req: ApiRequest<ChangePasswordDTO>, res: ApiResponse<string>) => Promise<ApiResponse<string>>
}


class ProfileController implements IProfileController {
    authService: IAuthService;

    constructor(auth: IAuthService) {
        this.authService = auth
    }



    changePassword = async (req: ApiRequest<ChangePasswordDTO>, res: ApiResponse<string>): Promise<ApiResponse<string>> => {
        const id = req.context?.userId

        if (!id) {


            return res.status(403).send({
                error: true,
                message: Errors.unauthorized.message
            })
        }

        const { newPassword, oldPassword } = req.body



        if (!newPassword || !oldPassword) {
            return res.status(403).send({
                error: true,
                message: Errors.passwordChange.message
            })
        }



        try {

            await this.authService.changePassword(oldPassword, newPassword, id)


            return res.status(200).send({
                error: false,
                message: "Successfull password change"
            })

        } catch (e) {
            log.info(e)
            const status = e.message === "Unauthorized" ? 403 : 500
            return res.status(status).send({
                error: true,
                message: e.message
            })
        }


    }





}



export default ProfileController