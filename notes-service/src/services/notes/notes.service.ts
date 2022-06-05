import { Errors } from "../../models/errors/errors";
import Note, { NewNote, UpdateNote } from "../../models/notes/notes";
import { INotesRepository } from "../../repositories/notes/notes.repository";

export interface INotesService {
    createNote: (note: NewNote) => Promise<Note>;
    deleteNote: (userId: number, noteId: number) => Promise<void>;
    updateNote: (userId: number, noteId: number, update: UpdateNote) => Promise<Note>;
    getNotes: (userId: number) => Promise<Note[]>;
    getNoteById: (userId: number, noteId: number) => Promise<Note>;
}


class NotesService implements INotesService {

    notesRepository: INotesRepository;


    constructor(notes: INotesRepository) {

        this.notesRepository = notes
    }


    createNote = (note: NewNote) => {

        return this.notesRepository.createNote(note)

    }


    deleteNote = async (userId: number, noteId: number): Promise<void> => {

        const deleted = await this.notesRepository.deleteNote(userId, noteId)


        if (deleted === 0) {
            throw Errors.noteDoesNotExist
        }
    }


    getNoteById = async (userId: number, noteId: number): Promise<Note> => {

        const note = await this.notesRepository.getNoteById(noteId)



        if (!note || note.deletedAt) {
            throw Errors.noteDoesNotExist
        }

        if (note.userId !== userId) {
            throw Errors.unauthorized
        }




        return note
    }


    getNotes = (userId: number): Promise<Note[]> => {



        return this.notesRepository.getNotes(userId)
    }


    updateNote = async (userId: number, noteId: number, update: UpdateNote): Promise<Note> => {


        const note = await this.getNoteById(userId, noteId)

        if (!note) {
            throw Errors.noteDoesNotExist
        }

        const updated = await this.notesRepository.updateNote(noteId, update)

        if (!updated) {
            throw Errors.noteUpdate
        }

        return updated


    }


}




export default NotesService