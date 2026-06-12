const request = require("supertest");
const app = require("../src/app");

describe("Root API", () => {

    test("should return API running message", async () => {

        const response = await request(app)
            .get("/");

        expect(response.statusCode).toBe(200);
        expect(response.body.message)
            .toContain("running");
    });

});