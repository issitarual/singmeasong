import { Request, Response } from 'express';
import { songList } from '../services/recommendServices';

async function randomRecommendation(req: Request, res: Response) {
    res.send("ok")
}

async function topRecommendations(req: Request, res: Response) {
    const { amount } = req.params;
    if(!amount) return res.sendStatus(400);
    if(!parseInt(amount)) return res.sendStatus(404);
    try{
        const recommendationsList = await songList(amount)
        res.send(recommendationsList);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

export { randomRecommendation, topRecommendations };