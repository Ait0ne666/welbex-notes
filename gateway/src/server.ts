import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';

import AuthController from './controllers/auth/auth.controller';
import { createAuthRouter } from './routers/auth-router';
import { PingController } from './controllers/ping/ping';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { docOptions } from './docs/docs';
import NotesController from './controllers/notes/notes.controller';
import { createNotesRouter } from './routers/notes-router';
import bunyan from 'bunyan'

const port = process.env.PORT || 3000;
export const log = bunyan.createLogger({name: 'Notes'})


const app = express();



//Middelware
if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan')
    app.use(morgan('combined'))
}
app.use(cors())
app.use(json());
app.use(urlencoded({ extended: true }));


//Dependencies
const authController = new AuthController()
const pingController = new PingController()
const notesController = new NotesController()


//Routers
app.use('/auth', createAuthRouter(authController))
app.use('/note', createNotesRouter(notesController))
app.get('/ping', pingController.pingHandler)




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




