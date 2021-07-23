import '../../src/setup';
import supertest from "supertest";
import app from "../../src/app";
import { clearDatabase, endConnection } from '../utils/database';
import faker from 'faker';
import { createAGenre } from '../factories/genreFactories';

beforeEach(async () => {
  await clearDatabase();
})

afterAll(async () => {
  await endConnection();
})

const agent = supertest(app);

describe("POST /genres", () => {
  it("should answer with status 400 when body is invalid", async () => {
    const body = {};
    
    const response = await agent.post("/genres").send(body);
    expect(response.status).toBe(400);
  });

  it("should answer with status 404 for invalid params", async () => {
    const body = {
      name: faker.datatype.number(),
    }

    const response = await agent.post("/genres").send(body);
    expect(response.status).toBe(404);
  })

  it("should answer with status 200 for valid params", async () => {
    const body = {
      name: "teste"
    }

    const response = await agent.post("/genres").send(body);
    expect(response.status).toBe(200);
  })
  
  it("should answer with status 409 for repeat params", async () => {
    const body = await createAGenre();

    const response = await agent.post("/genres").send(body);
    expect(response.status).toBe(409);
  })
});
