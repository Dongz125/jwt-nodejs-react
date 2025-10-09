import bcrypt from "bcryptjs";
import db from "../models";
import jwtService from "./jwtService";
import JWTActions from "../middleware/JWTActions";

const loginRegisterService = {
    hashPassword: (password) => {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        return hashedPassword;
    },

    checkExistingUsername: async (username) => {
        const user = await db.User.findOne({
            where: { username: username },
        });

        if (user) {
            return true;
        }

        return false;
    },

    checkExistingEmail: async (email) => {
        const user = await db.User.findOne({
            where: { email: email },
        });

        if (user) {
            return true;
        }

        return false;
    },

    checkExistingPhone: async (phone) => {
        const user = await db.User.findOne({
            where: { phone: phone },
        });

        if (user) {
            return true;
        }

        return false;
    },

    checkPassword: async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword);
    },

    // main functions
    registerUser: async (dataUser) => {
        try {
            const { email, username, phone, password, repassword } = dataUser;

            // check empty data
            if (!email || !username || !phone || !password || !repassword) {
                return {
                    EM: "Missing required parameters",
                    EC: 1,
                    DT: "",
                };
            }

            // check password match
            if (password !== repassword) {
                return {
                    EM: "Password and confirm password do not match",
                    EC: 2,
                    DT: "",
                };
            }

            // check existing username
            const isUsernameExist =
                await loginRegisterService.checkExistingUsername(username);
            if (isUsernameExist) {
                return {
                    EM: "Username is already in use",
                    EC: 3,
                    DT: "",
                };
            }

            // check existing email
            const isEmailExist = await loginRegisterService.checkExistingEmail(
                email,
            );

            if (isEmailExist) {
                return {
                    EM: "Email is already in use",
                    EC: 4,
                    DT: "",
                };
            }

            // check existing phone
            const isPhoneExist = await loginRegisterService.checkExistingPhone(
                phone,
            );
            if (isPhoneExist) {
                return {
                    EM: "Phone is already in use",
                    EC: 5,
                    DT: "",
                };
            }

            // all good
            const hashedPassword = loginRegisterService.hashPassword(password);
            await db.User.create({
                email: email,
                username: username,
                phone: phone,
                password: hashedPassword,
                groupId: 0,
            });

            return {
                EM: "Register user successfully",
                EC: 0,
                DT: "",
            };
        } catch (err) {
            console.log(">> Error in creating new user: ", err);

            return {
                EM: "Error in creating new user",
                EC: -1,
                DT: "",
            };
        }
    },

    loginUser: async (dataLogin) => {
        try {
            const { email, password } = dataLogin;

            const user = await db.User.findOne({
                where: { email: email },
            });

            if (!user) {
                return {
                    EM: "Wrong email or password!",
                    EC: 1,
                    DT: "",
                };
            }

            const isMatch = await loginRegisterService.checkPassword(
                password,
                user.password,
            );

            if (isMatch) {
                const roleData = await jwtService.getRoles(user);
                const payload = {
                        username: user.username,
                        email: user.email,
                        roles: roleData,
                    }

                    const token = JWTActions.createToken(payload)
                
                return {
                    EM: "Log in successfully!",
                    EC: 0,
                    DT: token,
                };
            } else {
                return {
                    EM: "Wrong email or password!",
                    EC: 1,
                    DT: "",
                };
            }
        } catch (err) {
            console.log(">> Error in log in: ", err);

            return {
                EM: "Something wrong in logging in!",
                EC: -1,
                DT: "",
            };
        }
    },
};

export default loginRegisterService;
