const request = require("supertest");
const app = require("../src/app");

describe("Favorites API", () => {

    test("should return empty favorites list", async () => {
        const response = await request(app)
            .get("/api/favorites");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("should add favorite city", async () => {
        const response = await request(app)
            .post("/api/favorites")
            .send({ city: "Shanghai" });

        expect(response.statusCode).toBe(201);
        expect(response.body.city).toBe("Shanghai");
    });

    test("should return 400 if city is missing", async () => {
        const response = await request(app)
            .post("/api/favorites")
            .send({});

        expect(response.statusCode).toBe(400);
    });

});

