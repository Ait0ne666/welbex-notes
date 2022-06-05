import { Router } from "express";
import { IProfileController } from "../controllers/profile/profile.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export const createProfileRouter = (profileControler: IProfileController) => {

    const ProfileRouter = Router()

    ProfileRouter.use(authMiddleware)

     /**
     * @openapi
     * /profile/password:
     *   put:
     *     security: 
     *       - bearerAuth: []
     *     description: registration
     *     tags: [Profile]
     *     requestBody:
     *        content:
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/PasswordChangeRequest'
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
    ProfileRouter.put('/password', profileControler.changePassword)


    return ProfileRouter


}