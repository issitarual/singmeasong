import '../../src/setup';
import supertest from "supertest";
import app from "../../src/app";
import { clearDatabase, endConnection } from '../utils/database';
import faker from 'faker';
import { createSong } from '../factories/voteFactory'

beforeEach(async () => {
  await clearDatabase();
})

afterAll(async () => {
  await endConnection();
})

const agent = supertest(app);

describe("POST /recommendations/:id/upvote", () => {
    it("should answer with status 404 when params are invalid", async () => {
      const id = faker.name.findName();

      const response = await agent.post(`/recommendations/${id}/upvote`);
      expect(response.status).toBe(404);
    });

    it("should answer with status 409 when params are invalid", async () => {
        let id = await createSong();
        id += 1;

        const response = await agent.post(`/recommendations/${id}/upvote`);
        expect(response.status).toBe(409);
      });
      it("should answer with status 200 when params are valid", async () => {
        let id = await createSong();

        const response = await agent.post(`/recommendations/${id}/upvote`);
        expect(response.status).toBe(200);
      });
  });

  describe("POST /recommendations/:id/downvote", () => {
    it("should answer with status 404 when params are invalid", async () => {
      const id = faker.name.findName();

      const response = await agent.post(`/recommendations/${id}/downvote`);
      expect(response.status).toBe(404);
    });

    it("should answer with status 409 when params are invalid", async () => {
        let id = await createSong();
        id += 1;

        const response = await agent.post(`/recommendations/${id}/downvote`);
        expect(response.status).toBe(409);
      });
      it("should answer with status 200 when params are valid", async () => {
        let id = await createSong();

        const response = await agent.post(`/recommendations/${id}/downvote`);
        expect(response.status).toBe(200);
      });
  });