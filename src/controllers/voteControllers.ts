import { Request, Response } from 'express';
import { existsSong } from '../repositories/recommendationsRepositories';
import { vote } from '../services/voteServices'

async function upVote(req: Request, res: Response) {
    const {id} = req.params;
    if(!id) return res.sendStatus(400);
    if(!parseInt(id)) return res.sendStatus(404);
    try{
        const existSong = await vote(parseInt(id), 'sum');
        if(!existSong) return res.sendStatus(409);
        else return res.sendStatus(200);
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

async function downVote(req:Request, res: Response) {
    const {id} = req.params;
    if(!id) return res.sendStatus(400);
    if(!parseInt(id)) return res.sendStatus(404);
    try{
        const existSong = await vote(parseInt(id), 'sub');
        if(!existSong) return res.sendStatus(409);
        else return res.sendStatus(200);
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

export { downVote, upVote };