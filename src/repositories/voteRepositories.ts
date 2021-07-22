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

async function verifyRate(id:number) {
    const verify = await connection.query(`
        SELECT * FROM songs WHERE id = $1
    `, [id])
    return verify.rows[0].rate;
}

async function deletSong(id:number) {
    await connection.query(`
        DELETE FROM songs WHERE id = $1
    `, [id])
}

export { addVote, removeVote, findSongById, verifyRate, deletSong };