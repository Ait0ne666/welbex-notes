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
  *         Note:
  *             type: object
  *             description: Note
  *             properties:
  *                 userId: 
  *                    type: number
  *                 text: 
  *                    type: string
  *                 title: 
  *                    type: string
  *                 createdAt: 
  *                    type: string
  *                    description: Date string
  *                 updatedAt: 
  *                    type: string
  *                    description: Date string
  *                 deletedAt: 
  *                    type: string
  *                    description: Date string       
  *         NoteResponse:
  *               type: object
  *               properties:
  *                 error:
  *                     type: boolean
  *                     description: shows if there was an error
  *                 data:
  *                     $ref: '#components/schemas/Note' 
  *         NotesResponse:
  *               type: object
  *               properties:
  *                 error:
  *                     type: boolean
  *                     description: shows if there was an error
  *                 data:
  *                     type: array
  *                     items: 
  *                         $ref: '#components/schemas/Note'
 */


import { Router } from "express";
import { IPingController } from "../controllers/ping/ping";
import { INotesController } from '../controllers/notes/notes.controller'
import { authMiddleware } from "../middleware/auth.middleware";
import { body } from "express-validator";




export const createNotesRouter = (pingController: IPingController, notesController: INotesController) => {
    const NotesRouter = Router();


    NotesRouter.use(authMiddleware)





    /**
 * @openapi
 * /note:
 *   post:
 *     description: Create note
 *     tags: [Note]
 *     security: 
 *       - bearerAuth: []
 *     requestBody:
 *        content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          text: 
 *                              type: string
 *                              required: true
 *                          title:
 *                              type: string
 *     responses:
 *       200:
 *         description: Returns created note
 *         content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/NoteResponse'
 *       400:
 *         description: Returns an error string
 *         content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Returns an error string
 *         content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ErrorResponse'
 *  
 */
    NotesRouter.post('/', body('text').trim().escape(), body('title').trim().escape(), notesController.createNote)


    /**
* @openapi
* /note/{noteId}:
*   delete:
*     description: Delete note
*     tags: [Note]
*     security: 
*       - bearerAuth: []
*     parameters:
*          - in: path
*            name: noteId
*            schema: 
*              type: string
*            required: true    
*     responses:
*       200:
*         description: Returns created note
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
*       403:
*         description: Returns an error string
*         content: 
*              application/json:
*                  schema:
*                      $ref: '#/components/schemas/ErrorResponse'
*  
*/
    NotesRouter.delete('/:id', notesController.deleteNote)



    /**
 * @openapi
 * /note/{noteId}:
 *   put:
 *     description: Update note
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: noteId
 *         schema: 
 *            type: string
 *         required: true   
 *     security: 
 *       - bearerAuth: []
 *     requestBody:
 *        content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          text: 
 *                              type: string
 *                          title:
 *                              type: string
 *     responses:
 *       200:
 *         description: Returns updated note
 *         content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/NoteResponse'
 *       400:
 *         description: Returns an error string
 *         content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Returns an error string
 *         content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ErrorResponse'
 *  
 */
    NotesRouter.put('/:id', body('text').trim().escape(), body('title').trim().escape(), notesController.updateNote)



    /**
 * @openapi
 * /note/{noteId}:
 *   get:
 *     description: Get note by id
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: noteId
 *         schema: 
 *            type: string
 *         required: true   
 *     security: 
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns  note
 *         content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/NoteResponse'
 *       400:
 *         description: Returns an error string
 *         content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Returns an error string
 *         content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ErrorResponse'
 *  
 */
    NotesRouter.get('/:id', notesController.getNote)



    /**
 * @openapi
 * /note:
 *   get:
 *     description: Get all notes for user
 *     tags: [Note]
 *     security: 
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns  note
 *         content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/NotesResponse'
 *       400:
 *         description: Returns an error string
 *         content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Returns an error string
 *         content: 
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                         $ref: '#/components/schemas/ErrorResponse'
 *  
 */
    NotesRouter.get('/', notesController.getNotes)


    return NotesRouter
}




