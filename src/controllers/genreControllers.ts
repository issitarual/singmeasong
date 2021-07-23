import { Request, Response } from 'express';
import { addGenre } from '../services/genreServices';

async function newGenre(req:Request, res: Response) {
    const { name } : {name: string}= req.body;
    if(!name ) return res.sendStatus(400);
    if(typeof name !== 'string') return res.sendStatus(404);
    try{
        const existGenre = await addGenre(name);
        if(existGenre) return res.sendStatus(409);
        else return res.sendStatus(200);
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

export { newGenre };