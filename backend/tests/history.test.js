const request = require("supertest");
const app = require("../src/app");

describe("History API", () => {

    test("should return search history list", async () => {
        const response = await request(app)
            .get("/api/history");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("should save city search history", async () => {
        const response = await request(app)
            .post("/api/history")
            .send({ city: "Shanghai" });

        expect(response.statusCode).toBe(201);
        expect(response.body.record.city).toBe("Shanghai");
        expect(response.body.record.searchedAt).toBeDefined();
    });

    test("should return 400 if city is missing", async () => {
        const response = await request(app)
            .post("/api/history")
            .send({});

        expect(response.statusCode).toBe(400);
    });

});