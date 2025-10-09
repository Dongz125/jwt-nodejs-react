import jwt from "jsonwebtoken";

const nonsecurePath = ["/", "/register", "/login"];

const JWTActions = {
    createToken: (payload) => {
        const secretKey = process.env.JWT_SECRET;

        if (!secretKey) {
            console.error("No secret key found!");
            return null;
        }

        try {
            const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
            return token;
        } catch (e) {
            console.error("JWT sign error:", e.message);
            return null;
        }
    },

    verifyToken: (token) => {
        const secretKey = process.env.JWT_SECRET;

        if (!secretKey) {
            console.error("No secret key found!");
            return null;
        }

        try {
            const decoded = jwt.verify(token, secretKey);
            return decoded;
        } catch (e) {
            console.error("JWT verify error:", e.message);
            return null;
        }
    },

    checkUserJWT: (req, res, next) => {
        if (nonsecurePath.includes(req.path)) {
            return next();
        }

        const token = req.cookies?.jwt;

        if (token) {
            const decoded = JWTActions.verifyToken(token);

            if (decoded) {
                req.user = decoded;
                return next();
            }
        }

        return res.status(401).json({
            EM: "Unable to authenticate user",
            EC: "-1",
            DT: null,
        });
    },

    checkUserPermission: (req, res, next) => {
        if (nonsecurePath.includes(req.path)) {
            return next();
        }

        const decodedUser = req.user;

        if (!decodedUser) {
            return res.status(403).json({
                EM: "You don't have permission to access",
                EC: "-2",
                DT: null,
            });
        }

        const { username, email, roles } = decodedUser;
        const currentUrl = req.path;

        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EM: "You don't have permission to access",
                EC: "-2",
                DT: null,
            });
        }

        const isAccepted = roles.some((item) =>
            currentUrl.startsWith(item.url),
        );

        if (!isAccepted) {
            return res.status(403).json({
                EM: "You don't have permission to access",
                EC: "-2",
                DT: null,
            });
        }

        return next();
    },
};

export default JWTActions;
