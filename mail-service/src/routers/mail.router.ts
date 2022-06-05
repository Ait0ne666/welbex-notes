/**
 * @openapi
  *  components:
  *     schemas:
  *         ErrorResponse:
  *             type: object
  *             properties:
  *                 error:
  *                     type: boolean
  *                     description: shows if there was an error
  *                 message:
  *                     type: string
  *                     description: error message
  *         SuccessResponse:
  *             type: object
  *             properties:
  *                 error:
  *                     type: boolean
  *                     description: shows if there was an error
  *                 message:
  *                     type: string
  *                     description: Text content  
 */

import { Router } from "express";
import { IMailController } from "../controllers/mail/mail.controller";

export const createMailRouter = (mailController: IMailController) => {



    const MailRouter = Router()


    /**
     * @openapi
     * /mail/send:
     *   post:
     *     description: send email
     *     tags: [Mail]
     *     requestBody:
     *        content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          email:
     *                              type: string
     *                              required: true
     *                          mail_type:
     *                              type: string
     *                              enum: [registration]
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
    MailRouter.post('/send', mailController.sendMail)


    return MailRouter
}