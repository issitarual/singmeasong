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

      const response = await agent.get(`/recommendations/random`);
      expect(response.status).toBe(404);
    });
    it("should answer with status 200 when params are valid", async () => {
        const event = await recommendASong();
        const response = await agent.get(`/recommendations/random`);
        expect(response.body).toEqual(event);
        expect(response.status).toBe(200);
      });
  });

  describe("GET /recommendations/top/:amount", () => {
    it("should answer with status 404 when params are invalid", async () => {
        const amount: string = faker.name.title()

        const response = await agent.get(`/recommendations/top/${amount}`);
        expect(response.status).toBe(404);
      });

      it("should answer with status 200 when params are valid", async () => {
        const amount: number = faker.datatype.number();
        const event = await recommendASong();

        const response = await agent.get(`/recommendations/top/${amount}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([event]);
      });
  });