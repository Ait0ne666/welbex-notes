
export enum MailTypes {
    Registration = "registration"
} 

export interface MailDTO {

    email: string,
    mail_type: MailTypes
}