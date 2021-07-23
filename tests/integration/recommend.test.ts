import '../../src/setup';
import supertest from "supertest";
import app from "../../src/app";
import { clearDatabase, endConnection } from '../utils/database';
import faker, { fake } from 'faker';
import { recommendASong } from '../factories/recommendFactory'

beforeEach(async () => {
  await clearDatabase();
})

afterAll(async () => {
  await endConnection();
})

const agent = supertest(app);

describe("GET /recommendations/random", () => {
    it("should answer with status 404 when there are no songs", async () => {
      try{
        const response = await agent.get(`/recommendations/random`);
        expect(response.status).toBe(404);
      }
      catch(e){
        console.error(e);
      }
    });
    it("should answer with status 201 when params are valid", async () => {
        const event = await recommendASong();
        try{
          const response = await agent.get(`/recommendations/amount`);
          expect(response.body).toEqual([event]);
          expect(response.status).toBe(201);
        }
        catch(e){
          console.error(e);
        }
      });
  });

  describe("GET /recommendations/top/:amount", () => {
    it("should answer with status 400 when params are empty", async () => {
      try{
        const response = await agent.get(`/recommendations/top/`);
        expect(response.status).toBe(40);
      }
      catch(e){
        console.error(e);
      }
    });

    it("should answer with status 404 when params are invalid", async () => {
        const amount: string = faker.name.title()
        try{
          const response = await agent.get(`/recommendations/top/${amount}`);
          expect(response.status).toBe(404);
        }
        catch(e){
          console.error(e);
        }
      });

      it("should answer with status 201 when params are valid", async () => {
        const amount: number = faker.datatype.number();
        const event = await recommendASong();
        try{
          const response = await agent.get(`/recommendations/top/${amount}`);
          expect(response.status).toBe(201);
          expect(response.body).toEqual([event]);
        }
        catch(e){
          console.error(e);
        }
      });
  });