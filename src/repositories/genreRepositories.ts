import connection from '../database';

async function existsGenre(name:string): Promise<{} | {name: string; id: number}> {
    const exist = await connection.query(`
    SELECT * 
    FROM genre 
    WHERE name = $1`,
    [name]
    );
    return exist.rows[0];
}

async function insertGenre( name: string) {
    await connection.query(`
        INSERT INTO genre
        (name)
        VALUES ($1)`,
        [name]
    );
}

async function listGenres() {
    const allGenres = await connection.query(`
        SELECT * FROM genre
        ORDER BY name
    `,);
    return allGenres.rows;
}

export { existsGenre, insertGenre, listGenres };