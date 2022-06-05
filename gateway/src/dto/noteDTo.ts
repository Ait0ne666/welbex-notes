import {ParamsDictionary} from 'express-serve-static-core'

export interface NoteDTO extends ParamsDictionary {
    id: string
}