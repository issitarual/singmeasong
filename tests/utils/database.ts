import connection from "../../src/database";

export async function clearDatabase () {
    await connection.query(`TRUNCATE TABLE songs`);
    await connection.query(`TRUNCATE TABLE genre`);
  }

export async function endConnection() {
    await clearDatabase();
    await connection.end();
}