import axios, { AxiosError } from "axios"
import { log } from "../../server"
import { config } from "../../config"
import { ApiRequest } from "../../dto/api-request"
import { ApiResponse, ResBody } from "../../dto/api-response"
import { CreateNoteDTO } from "../../dto/create-note-request"
import { Note } from "../../dto/note"
import { NoteDTO } from "../../dto/noteDTo"
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



    createNote = async (req: ApiRequest<CreateNoteDTO>, res: ApiResponse<Note>): Promise<ApiResponse<Note>> => {
        const auth = req.headers.authorization


        try {

            const response = await axios.post<ResBody<Note>>(config.notes + '/note', req.body, {
                headers: auth ? {
                    Authorization: auth
                } : undefined
            })



            return res.status(200).send(response.data)



        } catch (e) {
            
            if (e instanceof AxiosError) {
                return res.status(e.response?.status ?? 500).send({
                    error: true,
                    message: e.response?.data.message
                })
            } else {
                log.error(e)
                return res.status(500).send({
                    error: true,
                    message: Errors.server.message
                })
            }
        }

    }

    deleteNote = async (req: ApiRequest<{}, NoteDTO>, res: ApiResponse<string>): Promise<ApiResponse<string>> => {

        const { id } = req.params
        const auth = req.headers.authorization

        try {

            const response = await axios.delete<ResBody<string>>(config.notes + `/note/${id}`, {
                headers: auth ? {
                    Authorization: auth
                } : undefined
            })



            return res.status(200).send(response.data)



        } catch (e) {
            
            if (e instanceof AxiosError) {
                return res.status(e.response?.status ?? 500).send({
                    error: true,
                    message: e.response?.data.message
                })
            } else {
                log.error(e)
                return res.status(500).send({
                    error: true,
                    message: Errors.server.message
                })
            }
        }

    }


    updateNote = async (req: ApiRequest<UpdateNoteDTO, NoteDTO>, res: ApiResponse<Note>): Promise<ApiResponse<Note>> => {

        const { id } = req.params
        const auth = req.headers.authorization

        try {

            const response = await axios.put<ResBody<Note>>(config.notes + `/note/${id}`, req.body, {
                headers: auth ? {
                    Authorization: auth
                } : undefined
            })



            return res.status(200).send(response.data)



        } catch (e) {
            
            if (e instanceof AxiosError) {
                return res.status(e.response?.status ?? 500).send({
                    error: true,
                    message: e.response?.data.message
                })
            } else {
                log.error(e)
                return res.status(500).send({
                    error: true,
                    message: Errors.server.message
                })
            }
        }


    }



    getNote = async (req: ApiRequest<{}, NoteDTO>, res: ApiResponse<Note>): Promise<ApiResponse<Note>> => {
        const { id } = req.params
        const auth = req.headers.authorization

        try {

            const response = await axios.get<ResBody<Note>>(config.notes + `/note/${id}`, {
                headers: auth ? {
                    Authorization: auth
                } : undefined
            })



            return res.status(200).send(response.data)



        } catch (e) {
            
            if (e instanceof AxiosError) {
                return res.status(e.response?.status ?? 500).send({
                    error: true,
                    message: e.response?.data.message
                })
            } else {
                log.error(e)
                return res.status(500).send({
                    error: true,
                    message: Errors.server.message
                })
            }
        }

    }


    getNotes = async (req: ApiRequest<{}>, res: ApiResponse<Note[]>): Promise<ApiResponse<Note[]>> => {

        const auth = req.headers.authorization

        try {

            const response = await axios.get<ResBody<Note[]>>(config.notes + `/note`, {
                headers: auth ? {
                    Authorization: auth
                } : undefined
            })



            return res.status(200).send(response.data)



        } catch (e) {
            
            if (e instanceof AxiosError) {
                return res.status(e.response?.status ?? 500).send({
                    error: true,
                    message: e.response?.data.message
                })
            } else {
                log.error(e)
                return res.status(500).send({
                    error: true,
                    message: Errors.server.message
                })
            }
        }

    }
}



export default NotesController