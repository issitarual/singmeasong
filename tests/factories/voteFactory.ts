import faker from "faker";
import connection from "../../src/database";

export async function createSong () {
    const score: number = 0
    const data = {
    name: faker.name.findName(),
    youtubeLink: "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
    score: score,
  };

  const song = await connection.query(
    `INSERT INTO "songs" ("name", "youtubeLink", "score") VALUES ($1, $2, $3) RETURNING *`,
    [data.name, data.youtubeLink, data.score]
  );

  const id: number = song.rows[0].id;

  return id;
}