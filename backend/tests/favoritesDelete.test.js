const request = require("supertest");
const app = require("../src/app");

describe("Delete Favorite API", () => {

    test("should delete a favorite city", async () => {

        await request(app)
            .post("/api/favorites")
            .send({ city: "Beijing" });

        const response = await request(app)
            .delete("/api/favorites/Beijing");

        expect(response.statusCode).toBe(200);
        expect(response.body.city).toBe("Beijing");
    });

});