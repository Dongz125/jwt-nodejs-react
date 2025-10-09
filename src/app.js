import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes";
import connectDB from "./configs/connectDB";
import cors from "cors";

const app = express();

// use cors
app.use(
    cors({
        origin: [process.env.REACT_URL], // cho phép frontend React truy cập
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true, // nếu cần cookie/session
    }),
);

// config view engine
configViewEngine(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config cookie-parser
app.use(cookieParser())

// test connect to db
connectDB();

// init web routes
initWebRoutes(app);

export default app;
