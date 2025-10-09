import db from "../models";

const jwtService = {
    getRoles: async (user) => {
        const roles = await db.Group.findOne({
            where: { id: user.groupId },
            attributes: [],
            include: {
                model: db.Role,
                attributes: ["id", "url"],
                through: { attributes: [] },
            },
        });

        return roles ? roles.Roles : [];
    },
};

export default jwtService;
