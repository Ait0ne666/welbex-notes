import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { PingController } from './controllers/ping/ping';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { docOptions } from './docs/docs';
import MailService from './services/mail/mail.service';
import MailController from './controllers/mail/mail.controller';
import { createMailRouter } from './routers/mail.router';



const port = process.env.PORT || 5002;
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const app = express();

if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan')
    app.use(morgan('combined'))
}


app.use(cors())
app.use(json());
app.use(urlencoded({ extended: true }));


//Dependencies
const pingController = new PingController()
const mailService = new MailService()
const mailController = new MailController(mailService)


//Routers
app.get('/ping', pingController.pingHandler)
app.use('/mail', createMailRouter(mailController))


//Documentation setup
const specs = swaggerJsdoc(docOptions);
app.use(
    "/docs",
    swaggerUi.serve,
);
app.get('/docs', swaggerUi.setup(specs))



//Server initialization
app.listen(port, () => {
    console.log("Server is running on port " + port);
})




