import express from 'express';
import example from "./routes/example";
import connectionDB from './routes/dbConnection'
import dbScoreRoutes from "./routes/dbScoreRoutes";

const score = require("./scoreModel");
const app = express();
app.use(express.json());
connectionDB;
app.use("/api/example", example);
app.use("/api/dbScoreRoutes", dbScoreRoutes);

app.listen(5000, () => {
    console.log("started");
});

export default app;