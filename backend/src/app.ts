import express from 'express';
import example from "./routes/example";
import auth from "./routes/auth";
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();


app.use(express.json());

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

app.use(cors());
app.use(bodyParser.json());

app.use("/api/example", example);
app.use("/", auth);

app.listen(3001, () => {
    console.log("started");
});

export default app;