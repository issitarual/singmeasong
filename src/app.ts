import express from "express";
import cors from "cors";
import {recommendASong} from './controllers/recommendationsControlles'
import { downVote, upVote } from "./controllers/voteControllers";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", recommendASong);
app.post("/recommendations/:id/upvote", upVote);
app.post("/recommendations/:id/downvote", downVote)


export default app;
