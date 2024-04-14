import express from 'express';
import example from "./routes/example";

const app = express();

app.use(express.json());

app.use("/api/example", example);

app.listen(3001, () => {
    console.log("started");
});

export default app;