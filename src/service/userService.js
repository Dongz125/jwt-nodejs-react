import createConnection from "../configs/dbConfig";
import bcrypt from "bcryptjs";

const userService = {
    hashUserPassword: (userPassword) => {
        const salt = bcrypt.genSaltSync(10)
        let hashedPassword = bcrypt.hashSync(userPassword, salt);
        return hashedPassword;
    },

    createNewUser: async (email, password, username) => {
        try {
            let hashedPassword = userService.hashUserPassword(password);

            const connection = await createConnection();
            connection.query(
                // `INSERT INTO users (email, password, username) VALUES ("${email}", "${password}", "${username}")`,
                "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
                [email, hashedPassword, username],
            );
        } catch (err) {
            console.log(">> Error in creating new user: ", err);
        }
    },
    
    getUsersList: async () => {
        try {
            const connection = await createConnection();
            const [users] = await connection.query("SELECT * FROM users");

            return users;
        } catch (err) {
            console.log(">> Error in getting users list: ", err);
        }
    },

    deleteUserById: async (userId) => {
        try {
            const connection = await createConnection()
            await connection.query(`DELETE FROM users WHERE id=${userId}`)
        } catch(err) {
            console.log(">> Error in deleting user by id: ", err)
        }
    },

    getUserInformationById: async (userId) => {
        try {
            const connection = await createConnection()
            const [userInformation] = await connection.query(`SELECT id, email, username FROM users WHERE id=${userId}`)
            return userInformation[0]
        } catch(err) {
            console.log(">> Error in getting user information by ID: ", err)
        }
    },

    updateUserInformationById: async (userId, email, username) => {
        try {
            const connection = await createConnection()
            await connection.query(`UPDATE users SET email='${email}', username='${username}' WHERE id=${userId}`)
        } catch(err) {
            console.log(">> Error in updating user information by ID: ", err)
        }
    },
};

export default userService
