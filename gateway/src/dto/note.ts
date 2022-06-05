export interface Note {


    id: number;
    userId: number;
    text: string;
    title: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

}