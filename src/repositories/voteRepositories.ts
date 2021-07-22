import connection from '../database';

async function addVote(id:number) {
    await connection.query(`
        UPDATE songs 
        SET rate = rate + 1
        WHERE id = $1
    `, [id])
}

async function removeVote(id:number) {
    await connection.query(`
        UPDATE songs 
        SET rate = rate - 1
        WHERE id = $1
    `, [id])
}

async function findSongById(id:number) {
    const existSong = await connection.query(`
        SELECT * FROM songs WHERE id = $1
    `, [id])
    if(!existSong.rows[0]) return false
    return true
}

export { addVote, removeVote, findSongById };