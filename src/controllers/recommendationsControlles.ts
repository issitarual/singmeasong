import { Request, Response } from 'express';
import connection from '../database';

async function recommendASong(req: Request, res: Response) {
    const { name, youtubeLink } = req.body;
    if(!name || !youtubeLink) return res.sendStatus(400);
    if(typeof name !== 'string'|| !youtubeLink.includes('https://www.youtube.com/watch?v=')) return res.sendStatus(404);
    const rate: number = 0;
    try{
        const existRecommendation = await connection.query(`
            SELECT * 
            FROM songs 
            WHERE "youtubeLink" = $1`,
            [youtubeLink]
        );
        if(existRecommendation.rows[0]) return res.sendStatus(409)
        await connection.query(`
            INSERT INTO songs
            (name, "youtubeLink", rate)
            VALUES ($1, $2, $3)`,
            [name, youtubeLink, rate]
        );
        res.sendStatus(200);
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

export { recommendASong };