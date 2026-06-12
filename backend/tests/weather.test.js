const request = require("supertest");
const app = require("../src/app");

describe("Weather API", () => {

    test("should return 400 when city is missing", async () => {

        const response = await request(app)
            .get("/api/weather");

        expect(response.statusCode).toBe(400);
    });

    test("should return 400 when forecast city is missing", async () => {
        const response = await request(app)
            .get("/api/weather/forecast");

        expect(response.statusCode).toBe(400);
    });
});
