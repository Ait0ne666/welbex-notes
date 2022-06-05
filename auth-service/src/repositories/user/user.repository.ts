
import User from "../../models/user/user";

export interface IUserRepository {
    createUser: (password: string, email: string) => Promise<User>

    getUserByEmail: (email: string) => Promise<User | null>

    deleteUser: (id: number) => Promise<number>

    updateUser: (id: number, update: Partial<User>) => Promise<User | null>


    getUserById: (id: number) => Promise<User | null>
}





class UserRepository implements IUserRepository {
    public createUser = async (password: string, email: string): Promise<User> => {

        return User.create({
            createdAt: new Date(),
            email: email,
            password: password
        })


    }


    public getUserByEmail = async (email: string): Promise<User | null> => {

        try {
            const user = await User.findOne({
                where: {
                    email: email,
                    deletedAt: null
                }
            })

            return user
        } catch (err) {
            console.log(err)


            return null
        }

    }


    public deleteUser = async (id: number): Promise<number> => {

        try {
            await User.update({
                deletedAt: new Date()
            }, {
                where: {
                    id: id
                }
            })


            return 1
        } catch (err) {

            console.log(err)

            return 0
        }
    }


    public updateUser = async (id: number, update: Partial<User>): Promise<User | null> => {

        await User.update({ ...update, updatedAt: new Date() }, {
            where: {
                id: id
            }
        })

        return User.findByPk(id)
    }


    public getUserById = (id: number): Promise<User | null> => {
        return User.findByPk(id)
    }
}




export default UserRepository