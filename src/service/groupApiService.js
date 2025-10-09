import db from "../models";

const groupApiService = {
    getGroups: async () => {
        try {
            const response = await db.Group.findAll({
                attributes: ["id", "name"],
            });

            if(response) {
                console.log(response)
                return {
                    EM: "Get groups successfully!",
                    EC: 0,
                    DT: response
                }
            }
        } catch (e) {
            console.log(">>> Error in groupApiService.getGroups: ", e);

            return {
                EM: "Error in server!",
                EC: -1,
                DT: "",
            };
        }
    },
};

export default groupApiService;
