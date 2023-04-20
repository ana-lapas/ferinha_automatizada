import app from "index";
import { FruitInput } from "services/fruits-service";
import supertest from "supertest"

describe("Testing /fruits", () => {

    it("GET/fruits/id -> Return status 404 if fruit.id doesn't exists", async () => {
        const result = await supertest(app).get('/fruits/1');
        expect(result.status).toBe(404)
    })

    it("POST/fruits Status after posting a fruit", async () => {
        const body: FruitInput = {
            name: "banana",
            price: 5
        }
        const result = (await supertest(app).post('/fruits').send(body));
        expect(result.status).toBe(201)
    })

    it("GET/fruits/:id -> Status after asking for a specific fruit", async () => {
        const result = await supertest(app).get('/fruits/1');
        expect(result.status).toBe(200)
    })

    it("GET/fruits/:id -> Name after asking for a specific fruit", async () => {
        const result = await supertest(app).get('/fruits/1');
        expect(result.body.name).toBe("banana")
    })

    it("GET/fruits/:id -> Price after asking for a specific fruit", async () => {
        const result = await supertest(app).get('/fruits/1');
        expect(result.body.price).toBe(5)
    })

    it("GET/fruits/:id -> Returns banana", async () => {
        const result = await supertest(app).get('/fruits/1');
        expect(result.body).toEqual({
            id: 1,
            name: "banana",
            price: 5
        })
    })

    it("GET/fruits -> Return array of fruits", async () => {
        const result = await supertest(app).get('/fruits');
        expect(result.status).toBe(200)
        expect(result.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                price: expect.any(Number)
            })])
        )
    })
})