import axios from "axios";
import { EachMessageHandler } from "kafkajs";
import { config } from "../config";
import { MailDTO } from "../dto/mail";

export const mailController: EachMessageHandler = async ({ message }) => {
    console.log('New Message')
    switch (message.key?.toString()) {
        case 'mail':
            handleMail(message.value?.toString())
    }
    
}



const handleMail = async (json: string | undefined) => {


    if (!json) {
        console.log('Incorrect payload for message type mail')
    }

    const mailPayload: MailDTO = JSON.parse(json!)



    if (!mailPayload.email || !mailPayload.mail_type) {
        console.log('Incorrect payload for message type mail')
    }
    try {


        const start = new Date().getTime()
        await axios.post(config.mailServiceAddress + '/mail/send', mailPayload)
        const end = new Date().getTime()
        console.log('Email successfully sent\n' + "time elapsed: " + (end - start))



    } catch (e) {
        console.log("Error sending email: " + e)
    }

}