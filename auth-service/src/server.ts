import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import  { createAuthRouter } from './routers/auth-router';
import  { connectToDatabase } from './database/db';
import User from './models/user/user';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { docOptions } from './docs/docs';
import { PingController } from './controllers/ping/ping';
import AuthController from './controllers/auth/auth-controller';
import AuthService from './services/auth/auth.service';
import UserRepository from './repositories/user/user.repository';
import ProfileController from './controllers/profile/profile.controller';
import { createProfileRouter } from './routers/profile-router';
import { initKafka } from './kafka';
import bunyan from 'bunyan'

export const log = bunyan.createLogger({name: 'Notes-Auth-Service'})

const run = async () => {

    
    
    const port = process.env.PORT || 5000;
    
    
    
    
    const app = express();
    
    if (process.env.NODE_ENV !== 'production') {
        const morgan = require('morgan')
        app.use(morgan('combined'))
    }
    
    
    app.use(cors())
    app.use(json());
    app.use(urlencoded({ extended: true }));
    
    
    const producer = await initKafka()
    const userRepository = new UserRepository()
    const authService = new AuthService(userRepository, producer)
    
    
    const pingController = new PingController()
    const authController = new AuthController(authService)
    const profileController = new ProfileController(authService)
    
    
    
    
    
    
    app.use('/auth', createAuthRouter(pingController, authController))
    app.use('/profile', createProfileRouter(profileController))
    
    const specs = swaggerJsdoc(docOptions);
    
    
    
    
    app.use(
        "/docs",
        swaggerUi.serve,
    );
    
    
    app.get('/docs', swaggerUi.setup(specs))
    
    
    
    connectToDatabase(() => {
        app.listen(port, () => {
            console.log("Server is running on port " + port);
            User.sync({alter:true})
        })
    })
}








run()