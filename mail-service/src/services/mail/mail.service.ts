import { MailTypes } from "../../dto/mail-request";
import nodemailer from 'nodemailer'
import config from "../../config";

export interface IMailService {


    sendMail: (email: string, type: MailTypes) => Promise<void>
}




class MailService implements IMailService {

    sendMail = async (email: string, type: MailTypes): Promise<void> => {

        let transporter = nodemailer.createTransport({
            service: 'SendinBlue',
            host: 'smtp-relay.sendinblue.com',
            port: 587,
            auth: {
                user: "bonafide112358@gmail.com",
                pass: config.mailerPass
            }
        })


        

        if (type === MailTypes.Registration) {
            const msg = {
                to: email,
                from: 'bonafide112358@gmail.com',
                subject: 'Notes Registration',
                text: `Thank you for registration`,
                html: `<p>Thank you for registration</p>`
            }
            await transporter.sendMail(msg)


        } else {
            throw new Error("Incorrect mail type")
        }

    }
}



export default MailService

