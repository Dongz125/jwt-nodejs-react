import dotenv from "dotenv";
import app from "./src/app.js";
import JWTActions from "./src/middleware/JWTActions.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
