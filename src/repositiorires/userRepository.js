import User from "../schema/user.js"
// export const getUserByEmail = async (email) => {
//     try {
//         const user = await User.findone({ email });
//         return user;
//     } catch (error) {
//         console.log(error);
//     }
// }
// but now we use CRUD METHOD   ;
import crudRepository from "./crudRepository.js"

const userRepository = {
    ...crudRepository(User),

    getByEmail: async function (email) {
        const user = await User.findOne({ email });
        return user;
    },
    getByUsername: async function (username) {
        const user = await User.findOne({ username }).select('-password');
        return user;
    },
    // it already cntain create , find , find all , update , delete
}
export default userRepository;