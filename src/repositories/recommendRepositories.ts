import connection from '../database';

async function topSongs(amount: string): Promise<{name: string, youtubeLink: string; id: number; score: number}[]>{
    const songs = await connection.query(`
        SELECT * FROM songs
        ORDER BY score DESC
        LIMIT $1
    `,[amount])
    return songs.rows;
}

async function listAllSongs(): Promise<{name: string, youtubeLink: string; id: number; score: number}[] | {}[]> {
    const songs = await connection.query(`
    SELECT * FROM songs
`)
return songs.rows;
}

export { topSongs, listAllSongs };