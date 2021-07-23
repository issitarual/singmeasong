import connection from '../database';

async function existsSong(youtubeLink:string) {
    const exist = await connection.query(`
    SELECT * 
    FROM songs 
    WHERE "youtubeLink" = $1`,
    [youtubeLink]
    );
    return exist.rows[0];
}

async function insertSong(youtubeLink:string, name: string) {
    const score: number = 0;
    await connection.query(`
        INSERT INTO songs
        (name, "youtubeLink", score)
        VALUES ($1, $2, $3)`,
        [name, youtubeLink, score]
    );
}

export { existsSong, insertSong };