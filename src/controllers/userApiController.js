import userApiService from "../service/userApiService";

const userApiController = {
    readUser: async (req, res) => {
        const response = await userApiService.getUser(req.query.page);
        console.log(
            ">>> check response from userApiService.getUser: ",
            response,
        );
        return res.status(200).json(response);
    },

    readUserById: async (req, res) => {
        const response = await userApiService.getUserById(req.query.id);
        console.log(
            ">>> check response from userApiService.readUserById: ",
            response,
        );
        return res.status(200).json(response);
    },

    createUser: async (req, res) => {
        const response = await userApiService.createUser(req.body);
        console.log(
            ">>> check response from userApiService.createUser: ",
            response,
        );
        return res.status(200).json(response);
    },

    updateUser: async (req, res) => {
        console.log(req.body)
        const response = await userApiService.updateUser(req.body);
        console.log(
            ">>> check response from userApiService.updateUser: ",
            response,
        );
        return res.status(200).json(response);
    },

    deleteUser: async (req, res) => {
        const response = await userApiService.deleteUser(req.body);
        console.log(
            ">>> check response from userApiService.deleteUSer:",
            response,
        );
        return res.status(200).json(response);
    },
};

export default userApiController;
