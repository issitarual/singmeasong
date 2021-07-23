import connection from '../database';

async function topSongs(amount: string){
    const songs = await connection.query(`
        SELECT * FROM songs
        ORDER BY score DESC
        LIMIT $1
    `,[amount])
    return songs.rows;
}

export { topSongs };