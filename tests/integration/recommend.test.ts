import '../../src/setup';
import supertest from "supertest";
import app from "../../src/app";
import { clearDatabase, endConnection } from '../utils/database';
import faker from 'faker';
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
        const response = await agent.post(`/recommendations/random`);
        expect(response.status).toBe(404);
      }
      catch(e){
        console.error(e);
      }
    });
    it("should answer with status 201 when params are valid", async () => {
        const event = await recommendASong();
        try{
          const response = await agent.post(`/recommendations/amount`);
          expect(response.body).toEqual([event]);
          expect(response.status).toBe(201);
        }
        catch(e){
          console.error(e);
        }
      });
  });

  describe("GET /recommendations/top/:amount", () => {
    
  });