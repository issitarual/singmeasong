import express from "express";
import cors from "cors";
import { recommendASong } from './controllers/newSongControlers'
import { score } from "./controllers/voteControllers";
import { randomRecommendation, topRecommendations } from "./controllers/recommendControllers";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", recommendASong);
app.post("/recommendations/:id/upvote", score);
app.post("/recommendations/:id/downvote", score)
app.get("/recommendations/random", randomRecommendation);
app.get("/recommendations/top/:amount", topRecommendations)

export default app;
