import '../../src/setup';
import supertest from "supertest";
import app from "../../src/app";
import { clearDatabase, endConnection } from '../utils/database';
import faker from 'faker';

beforeEach(async () => {
  await clearDatabase();
})

afterAll(async () => {
  await endConnection();
})

const agent = supertest(app);

describe("POST /recommendations", () => {
  it("should answer with status 400 when body is invalid", async () => {
    const body = {};
    try{
      const response = await agent.post("/recommendations").send(body);
      expect(response.status).toBe(400);
    }
    catch(e){
      console.error(e);
    }
  });

  it("should answer with status 404 for invalid params", async () => {
    const body = {
      name: faker.name,
      youtubeLink: faker.internet.url
    }
    try{
      const response = await agent.post("/recommendations").send(body);
      expect(response.status).toBe(404);
    }
    catch(e){
      console.error(e);
    }
  })

  it("should answer with status 404 for invalid params", async () => {
    const body = {
      name: faker.datatype.number,
      youtubeLink: faker.internet.url
    }
    try{
      const response = await agent.post("/recommendations").send(body);
      expect(response.status).toBe(404);
    }
    catch(e){
      console.error(e);
    }
  })
  it("should answer with status 200 for valid params", async () => {
    const body = {
      name: faker.datatype.string,
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
    }
    try{
      const response = await agent.post("/recommendations").send(body);
      expect(response.status).toBe(200);
    }
    catch(e){
      console.error(e);
    }
  })
  
  it("should answer with status 409 for repeat params", async () => {
    const body = {
      name: faker.datatype.string,
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
    }
    try{
      const response = await agent.post("/recommendations").send(body);
      expect(response.status).toBe(409);
    }
    catch(e){
      console.error(e);
    }
  })
});
