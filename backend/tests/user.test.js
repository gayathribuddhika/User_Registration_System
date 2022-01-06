const supertest = require ('supertest');
const app = require ('../app');

// test the get all users API..this has some error.need to be corrected
describe("take all the users in database", () => {
    test("all user details are needed", async () => {
        const {status, data} = await supertest(app).post("/api/users/all-users");
        
        expect(status).toBe(404);
        expect(data).toEqual(data);
    })
})
