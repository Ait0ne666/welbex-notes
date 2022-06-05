/**
 * @openapi
 *   components:
 *      securitySchemes:
 *           bearerAuth:           
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT 
 *      schemas:
 *          AuthRequest:
 *              type: object
 *              properties:
 *                  oldPassword:
 *                      type: string
 *                      description: user old password
 *                  newPassword: 
 *                      type: string
 *                      description: user new password
 *          PasswordChangeRequest:
 *              type: object
 *              properties:
 *                  oldPassword:
 *                      type: string
 *                      description: user email
 *                  newPassword: 
 *                      type: string
 *                      description: user password
 *          ErrorResponse:
 *              type: object
 *              properties:
 *                  error:
 *                      type: boolean
 *                      description: shows if there was an error
 *                  message:
 *                      type: string
 *                      description: error message
 *          SuccessResponse:
 *              type: object
 *              properties:
 *                  error:
 *                      type: boolean
 *                      description: shows if there was an error
 *                  message:
 *                      type: string
 *                      description: Text content 
 *          AuthResponse:       
 *              type: object
 *              properties:
 *                  error:
 *                      type: boolean
 *                      description: shows if there was an error
 *                  data:
 *                      type: object
 *                      properties:
 *                          jwt:
 *                              type: string
 *                              description: access token
 *                          refresh: 
 *                              type: string
 *                              description: refresh token
 */


import { Router } from "express";
import { IPingController,  } from "../controllers/ping/ping";
import  { IAuthController } from "../controllers/auth/auth-controller";


export const createAuthRouter = (pingController: IPingController, authController: IAuthController) => {

    const AuthRouter = Router();
    

    
    
    
    /**
     * @openapi
     * /ping:
     *   get:
     *     description: ping endpoint
     *     tags: [Ping]
     *     responses:
     *       200:
     *         description: Returns a pong string
     *         content: 
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/SuccessResponse'
     */
    AuthRouter.get('/ping', pingController.pingHandler)
    
    
    /**
     * @openapi
     * /auth/register:
     *   post:
     *     description: registration
     *     tags: [Auth]
     *     requestBody:
     *        content:
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/AuthRequest'
     *     responses:
     *       200:
     *         description: Returns success string
     *         content: 
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/SuccessResponse'
     *       400:
     *         description: Returns an error string
     *         content: 
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/ErrorResponse'
     *  
     */
    AuthRouter.post('/register', authController.register)
    
    
    
    /**
     * @openapi
     * /auth/login:
     *   post:
     *     description: login with email and password
     *     tags: [Auth]
     *     requestBody:
     *        content:
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/AuthRequest'
     *     responses:
     *       200:
     *         description: Returns access and refresh tokens
     *         content: 
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/AuthResponse'
     *       400:
     *         description: Returns an error string
     *         content: 
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/ErrorResponse'
     *  
     */
    AuthRouter.post('/login', authController.login)



    /**
     * @openapi
     * /auth/refresh:
     *   post:
     *     description: refresh access tokens
     *     tags: [Auth]
     *     parameters:
     *      - in: header
     *        name: Authorization
     *        description: Access token (can be expired)
     *        schema:
     *           type: string
     *           example: Bearer token
     *     requestBody:
     *        content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          refresh:
     *                              type: string
     *                              description: refresh token
     *     responses:
     *       200:
     *         description: Returns access and refresh tokens
     *         content: 
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/AuthResponse'
     *       400:
     *         description: Returns an error string
     *         content: 
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/ErrorResponse'
     *  
     */
    AuthRouter.post('/refresh', authController.refresh)

    return AuthRouter
}




