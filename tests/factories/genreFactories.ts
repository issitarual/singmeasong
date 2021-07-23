import faker from "faker";
import connection from "../../src/database";

export async function createAGenre (): Promise<{name: string; id: number}>{
    const data = {
        name: faker.name.firstName(),
    };

  const genre= await connection.query(
    `INSERT INTO "genre" ("name") VALUES ($1) RETURNING *`,
    [data.name]
  );

  const newGenre: {
      name: string; 
      id: number; 
    } = genre.rows[0];

  return newGenre;
}