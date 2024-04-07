import { db } from "../";
import { User } from "../db/models/users";

class UserService {
    getUserById = async (userId: number): Promise<User> => {
        const user = await db.findOne(User, {
            id: userId
        });
        if (!user) {
            throw new Error('Could not find user');
        }
        return user;
    }
}

const userService = new UserService();
export default userService;