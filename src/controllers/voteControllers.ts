import { Request, Response } from 'express';
import { vote } from '../services/voteServices'

async function score(req: Request, res: Response) {
    const path = req.path;
    let type:string = null;
    if (path.includes('upvote')) type = 'sum';
    else type = 'sub';

    const {id} = req.params;
    if(!id) return res.sendStatus(400);
    if(!parseInt(id)) return res.sendStatus(404);

    try{
        const existSong = await vote(parseInt(id), type);
        if(!existSong) return res.sendStatus(409);
        else return res.sendStatus(200);
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

export { score };