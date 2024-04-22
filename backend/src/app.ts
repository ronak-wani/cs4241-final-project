import express from 'express';
import example from "./routes/example";
import auth from "./routes/auth";
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectionDB from './routes/dbConnection'
import dbScoreRoutes from "./routes/dbScoreRoutes";

const score = require("./scoreModel");
const app = express();


app.use(express.json());
connectionDB;

//sessions middleware
app.use(session({
    secret: 'react-game',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24*60*60*1000 //for one day
    }
}));

//set passport middleware
app.use(passport.initialize());
app.use(passport.session());

//app.use(cors({ maxAge: 84600 }));
app.use(
    cors({
        origin: "http://localhost:3000", // React app's origin
        credentials: true,
    })
)
app.use(bodyParser.json());

app.use("/api/example", example);
app.use("/api/dbScoreRoutes", dbScoreRoutes);
app.use("/api/auth", auth);

app.listen(5000, () => {
    console.log("started");
});

export default app;