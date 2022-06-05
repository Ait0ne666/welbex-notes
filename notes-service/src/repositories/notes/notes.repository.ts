import Note, { NewNote } from "../../models/notes/notes";

export interface INotesRepository {
    createNote: (note: NewNote) => Promise<Note>;
    deleteNote: (userId:number, noteId: number) => Promise<number>;
    updateNote: (noteId: number, update: Partial<Note> ) => Promise<Note | null>;
    getNotes: (userId: number) => Promise<Note[]>;
    getNoteById: (noteId: number) => Promise<Note|null>;
}





class NotesRepository implements INotesRepository {
    createNote = async (note: NewNote) : Promise<Note> => {
        return Note.create({
            text: note.text,
            title: note.title,
            createdAt: new Date(),
            deletedAt: null,
            updatedAt: new Date(),
            userId: note.userId
        })
    }

    deleteNote = async (userId: number, noteId: number) : Promise<number> => {
        const res = await Note.update({
            deletedAt: new Date()
        }, {
            where: {
                userId: userId,
                id: noteId,
                deletedAt: null
            }
        })


        return res[0]
    }
    updateNote = async (noteId: number, update: Partial<Note>) : Promise<Note | null> => {
        
        const updated = await Note.update(update, {
            where: {
                id: noteId
            }
        })


        if (updated[0] === 0) {
            return null
        }

        return Note.findByPk(noteId)
    }
    getNotes = async (userId: number) : Promise<Note[]> => {



        return Note.findAll({
            where: {
                userId: userId,
                deletedAt: null
            }
        })
    }

    getNoteById = async (noteId: number) : Promise<Note|null> => {

        
        return Note.findByPk(noteId)
    }
}



export default NotesRepository