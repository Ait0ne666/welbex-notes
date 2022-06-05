import { Errors } from "../../models/errors/errors";
import { ApiRequest } from "../../dto/api-request";
import { ApiResponse } from "../../dto/api-response";
import { MailDTO } from "../../dto/mail-request";
import { IMailService } from "../../services/mail/mail.service";

export interface IMailController {


    sendMail: (req: ApiRequest<MailDTO>, res: ApiResponse<string>) => Promise<ApiResponse<string>>;
}





class MailController implements IMailController {

    mailService: IMailService


    constructor(mail: IMailService) {
        this.mailService  = mail
    }



    sendMail = async(req: ApiRequest<MailDTO>, res: ApiResponse<string>): Promise<ApiResponse<string>> => {

        const {email, mail_type} = req.body

        if (!email || !mail_type) {
            return res.status(400).send({
                error: true,
                message: Errors.emailPayload.message
            })
        }


        try {
            await this.mailService.sendMail(email, mail_type)



            return res.status(200).send({
                error: false, 
                message: "Email successfully sent"
            })
        } catch (e) {
            return res.status(400).send({
                error: true,
                message: e.message
            })
        }
    }
}



export default MailController