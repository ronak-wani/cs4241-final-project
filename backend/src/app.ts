import express from 'express';
import example from "./routes/example";
import connectionDB from './routes/dbConnection'

const app = express();
app.use(express.json());
connectionDB;
app.use("/api/example", example);

app.listen(5000, () => {
    console.log("started");
});

export default app;