import loginRegisterService from "../service/loginRegisterService.js";

const apiController = {
    testApi: (req, res) => {
        res.json({ message: "API is working!" });
    },

    handleRegister: async (req, res) => {
        const response = await loginRegisterService.registerUser(req.body);

        console.log(">>> Check response from service Register: ", response);

        return res.status(200).json(response);
    },

    handleLogin: async (req, res) => {
        const response = await loginRegisterService.loginUser(req.body);

        // set cookie
        if (response && response.DT) {
            res.cookie("jwt", response.DT, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000,
            });
            console.log("cookie jwt set!");
        }

        console.log(">>> Check response from service Login: ", response);

        return res.status(200).json(response);
    },
};

export default apiController;
