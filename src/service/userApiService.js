import bcrypt from "bcryptjs/dist/bcrypt";
import db from "../models";

const userApiService = {
    getUser: async (currentPage) => {
        const limit = 5;

        try {
            const userPagination = await db.User.findAndCountAll({
                attributes: ["id", "username", "email", "phone"],
                include: [
                    {
                        model: db.Group,
                        attributes: ["name"],
                    },
                ],
                limit: limit,
                offset: (currentPage - 1) * limit,
            });

            if (userPagination) {
                return {
                    EM: "Get users list successfully!",
                    EC: "0",
                    DT: {
                        totalPages: Math.ceil(userPagination.count / limit),
                        users: userPagination.rows,
                    },
                };
            }

            return {
                EM: "Get users list successfully!",
                EC: "0",
                DT: {
                    totalPages: 0,
                    users: [],
                },
            };
        } catch (e) {
            console.log(">>> Error in getUser service: ", e);

            return {
                EM: "Some problems in service!",
                EC: "-1",
                DT: "",
            };
        }
    },

    getUserById: async (userId) => {
        try {
            const response = await db.User.findOne({
                where: { id: userId },
            });

            return {
                EM: "Get user by ID successfully!",
                EC: "0",
                DT: response,
            };
        } catch (e) {
            console.log(">>> Error in getUserById service: ", e);

            return {
                EM: "Some problems in service!",
                EC: "-1",
                DT: "",
            };
        }
    },

    createUser: async (userData) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(userData.password, salt);

            await db.User.create({ ...userData, password: hashedPass });

            return {
                EM: "Create user successfully!",
                EC: "0",
                DT: "",
            };
        } catch (e) {
            console.log(">>> Error in createUser service: ", e);

            return {
                EM: "Some problems in service!",
                EC: "-1",
                DT: "",
            };
        }
    },

    updateUser: async (userData) => {
        try {
            await db.User.update(userData, {
                where: { username: userData.username },
            });

            return {
                EM: "Update user successfully!",
                EC: "0",
                DT: "",
            };
        } catch (e) {
            console.log(">>> Error in createUser service: ", e);

            return {
                EM: "Some problems in service!",
                EC: "-1",
                DT: "",
            };
        }
    },

    deleteUser: async (user) => {
        try {
            await db.User.destroy({ where: { id: user.id } });

            return {
                EM: "Delete user successfully!",
                EC: "0",
                DT: "",
            };
        } catch (e) {
            console.log(">>> Error in deleteUser service: ", e);

            return {
                EM: "Some problems in service!",
                EC: "-1",
                DT: "",
            };
        }
    },
};

export default userApiService;
