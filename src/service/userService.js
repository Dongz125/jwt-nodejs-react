import createConnection from "../configs/dbConfig";
import bcrypt from "bcryptjs";
import db from "../models";
import { where } from "sequelize/lib/sequelize";

const userService = {
    hashUserPassword: (userPassword) => {
        const salt = bcrypt.genSaltSync(10);
        let hashedPassword = bcrypt.hashSync(userPassword, salt);
        return hashedPassword;
    },

    createNewUser: async (email, password, username) => {
        try {
            let hashedPassword = userService.hashUserPassword(password);

            await db.User.create({
                username: username,
                email: email,
                password: hashedPassword,
            });
        } catch (err) {
            console.log(">> Error in creating new user: ", err);
        }
    },

    getUsersList: async () => {
        try {
            const users = await db.User.findAll({
                attributes: ["id", "email", "username"],
            });

            return users;
        } catch (err) {
            console.log(">> Error in getting users list: ", err);
        }
    },

    deleteUserById: async (userId) => {
        try {
            await db.User.destroy({
                where: {
                    id: userId,
                },
            });
        } catch (err) {
            console.log(">> Error in deleting user by id: ", err);
        }
    },

    getUserInformationById: async (userId) => {
        try {
            const user = await db.User.findOne({
                attributes: ["id", "email", "username"],

                where: {
                    id: userId,
                },
            });

            return user;
        } catch (err) {
            console.log(">> Error in getting user information by ID: ", err);
        }
    },

    updateUserInformationById: async (userId, email, username) => {
        try {
            await db.User.update(
                {
                    email: email,
                    username: username,
                },

                {
                    where: {
                        id: userId,
                    },
                },
            );
        } catch (err) {
            console.log(">> Error in updating user information by ID: ", err);
        }
    },
};

export default userService;
