import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import  { connectToDatabase } from './database/db';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { docOptions } from './docs/docs';
import { PingController } from './controllers/ping/ping';
import NotesController from './controllers/notes/notes.controller';
import {createNotesRouter} from './routers/notes-router'
import NotesRepository from './repositories/notes/notes.repository';
import NotesService from './services/notes/notes.service';
import Note from './models/notes/notes';





const port = process.env.PORT || 5001;

const app = express();







//Middlewares
if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan')
    app.use(morgan('combined'))
}
app.use(cors())
app.use(json());
app.use(urlencoded({ extended: true }));




//Dependencies
const notesRepository = new NotesRepository()
const notesService = new NotesService(notesRepository)

const pingController = new PingController()
const notesController = new NotesController(notesService)



//Routers
app.use('/note', createNotesRouter(pingController, notesController))
app.get('/ping', pingController.pingHandler)






//Documentation setup
const specs = swaggerJsdoc(docOptions);
app.use(
    "/docs",
    swaggerUi.serve,
);
app.get('/docs', swaggerUi.setup(specs))









//Server initialization
connectToDatabase(() => {
    app.listen(port, () => {
        console.log("Server is running on port " + port);
        Note.sync({alter: true})
    })
})






