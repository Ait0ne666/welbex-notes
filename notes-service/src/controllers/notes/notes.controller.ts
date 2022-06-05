import { NoteDTO } from "../../dto/noteDTo"
import { ApiRequest } from "../../dto/api-request"
import { ApiResponse } from "../../dto/api-response"
import { CreateNoteDTO } from "../../dto/create-note-request"
import Note from "../../models/notes/notes"
import { INotesService } from "../../services/notes/notes.service"
import { UpdateNoteDTO } from "../../dto/update-note-request"
import { Errors } from "../../models/errors/errors"


export interface INotesController {
    createNote: (req: ApiRequest<CreateNoteDTO>, res: ApiResponse<Note>) => Promise<ApiResponse<Note>>
    deleteNote: (req: ApiRequest<{}, NoteDTO>, res: ApiResponse<string>) => Promise<ApiResponse<string>>
    updateNote: (req: ApiRequest<UpdateNoteDTO, NoteDTO>, res: ApiResponse<Note>) => Promise<ApiResponse<Note>>
    getNote: (req: ApiRequest<{}, NoteDTO>, res: ApiResponse<Note>) => Promise<ApiResponse<Note>>
    getNotes: (req: ApiRequest<{}>, res: ApiResponse<Note[]>) => Promise<ApiResponse<Note[]>>
}



class NotesController implements INotesController {

    notesService: INotesService



    constructor(notes: INotesService) {
        this.notesService = notes
    }


    createNote = async (req: ApiRequest<CreateNoteDTO>, res: ApiResponse<Note>): Promise<ApiResponse<Note>> => {

        const { text, title } = req.body
        const id = req.context?.userId



        if (!id) {
            return res.status(403).send({
                error: true,
                message: Errors.unauthorized.message
            })
        }

        if (!text) {
            return res.status(400).send({
                error: true,
                message: Errors.notePayloadText.message
            })
        }




        try {

            const note = await this.notesService.createNote({
                userId: id,
                text: text,
                title: title
            })


            return res.status(200).send({
                error: false,
                data: note
            })

        } catch (e) {
            return res.status(400).send({
                error: true,
                message: e.message
            })
        }


    }

    deleteNote = async (req: ApiRequest<{}, NoteDTO>, res: ApiResponse<string>): Promise<ApiResponse<string>> => {
        const id = req.context?.userId



        if (!id) {
            return res.status(403).send({
                error: true,
                message: Errors.unauthorized.message
            })
        }


        const noteIdString = req.params.id

        const noteId = Number.parseInt(noteIdString)


        if (isNaN(noteId)) {
            return res.status(400).send({
                error: true,
                message: Errors.notePayloadId.message
            })
        }


        try {
            await this.notesService.deleteNote(id, noteId)


            return res.status(200).send({
                error: false,
                message: "Successfully deleted"
            })

        } catch (e) {
            return res.status(400).send({
                error: true,
                message: e.message
            })
        }

    }


    updateNote = async (req: ApiRequest<UpdateNoteDTO, NoteDTO>, res: ApiResponse<Note>): Promise<ApiResponse<Note>> => {

        const { text, title } = req.body
        const id = req.context?.userId



        if (!id) {
            return res.status(403).send({
                error: true,
                message: Errors.unauthorized.message
            })
        }

        if (!text && !title) {
            return res.status(400).send({
                error: true,
                message: Errors.noteDoesNotExist.message
            })
        }

        const noteIdString = req.params.id

        const noteId = Number.parseInt(noteIdString)


        if (isNaN(noteId)) {
            return res.status(400).send({
                error: true,
                message: Errors.notePayloadId.message
            })
        }


        try {

            const note = await this.notesService.updateNote(id, noteId, {
                text: text,
                title: title
            })


            return res.status(200).send({
                error: false,
                data: note
            })

        } catch (e) {
            return res.status(400).send({
                error: true,
                message: e.message
            })
        }


    }



    getNote = async (req: ApiRequest<{}, NoteDTO>, res: ApiResponse<Note>): Promise<ApiResponse<Note>> => {
        const id = req.context?.userId



        if (!id) {
            return res.status(403).send({
                error: true,
                message: Errors.unauthorized.message
            })
        }


        const noteIdString = req.params.id

        const noteId = Number.parseInt(noteIdString)


        if (isNaN(noteId)) {
            return res.status(400).send({
                error: true,
                message: Errors.notePayloadId.message
            })
        }


        try {
            const note = await this.notesService.getNoteById(id, noteId)


            return res.status(200).send({
                error: false,
                data: note
            })

        } catch (e) {
            return res.status(400).send({
                error: true,
                message: e.message
            })
        }

    }


    getNotes = async (req: ApiRequest<{}>, res: ApiResponse<Note[]>): Promise<ApiResponse<Note[]>> => {
        const id = req.context?.userId



        if (!id) {
            return res.status(403).send({
                error: true,
                message: Errors.unauthorized.message
            })
        }



        try {
            const notes = await this.notesService.getNotes(id)


            return res.status(200).send({
                error: false,
                data: notes
            })

        } catch (e) {
            return res.status(400).send({
                error: true,
                message: e.message
            })
        }

    }
}



export default NotesController