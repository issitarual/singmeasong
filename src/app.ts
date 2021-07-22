import express from "express";
import cors from "cors";
import {recommendASong} from './controllers/recommendationsControlles'
import connection from "./database";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", recommendASong);
app.get("/recommendations", async (req, res) => {
    try{
        const request = await connection.query(`select * from songs`)
        res.send(request.rows)
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
});


export default app;
