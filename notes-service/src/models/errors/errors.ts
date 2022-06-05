export const Errors =  {
    unauthorized: new Error("Unauthorized"),
    userExist: new Error("User with such email already exist"),
    invalidCredentials: new Error("Incorrect email or password"),
    userUpdate: new Error("Unable to update user"),
    email: new Error("Incorrect email"),
    password: new Error("Password is required"),
    passwordChange: new Error("New and old passwords are required"),
    server: new Error("Server error"),
    emailPayload: new Error("Email and mail_type are required"),
    notePayloadText: new Error("Text is required"),
    notePayloadId: new Error("Incorrect note id"),
    noteDoesNotExist: new Error("Nothing to update"),
    noteUpdate: new Error("Unable to update note")
    
}