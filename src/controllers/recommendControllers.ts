import { Request, Response } from 'express';
import { songList, sortSong } from '../services/recommendServices';

async function randomRecommendation(req: Request, res: Response) {
    try{
        const sortedSong = await sortSong();
        if(!sortSong) return res.sendStatus(404);
        else return res.send(sortedSong);
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
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
        console.error(e);
        res.sendStatus(500);
    }
}

export { randomRecommendation, topRecommendations };