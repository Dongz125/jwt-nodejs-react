import groupApiService from "../service/groupApiService";

const groupApiController = {
    getGroups: async (req, res) => {
        const response = await groupApiService.getGroups()
        console.log(">>> Check response from groupApiService.getGroups: ", response)
        res.status(200).json(response);
    },
};

export default groupApiController;
