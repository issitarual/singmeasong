import { Request, Response } from 'express';
import { addRecommendation } from '../services/newSongServices'

async function recommendASong(req: Request, res: Response) {
    const { name, youtubeLink } : {name: string; youtubeLink: string}= req.body;
    if(!name || !youtubeLink) return res.sendStatus(400);
    if(typeof name !== 'string'|| !youtubeLink.includes('https://www.youtube.com/watch?v=')) return res.sendStatus(404);
    try{
        const existRecommandation = await addRecommendation(youtubeLink, name);
        if(existRecommandation) return res.sendStatus(409);
        else return res.sendStatus(200);
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

export { recommendASong };