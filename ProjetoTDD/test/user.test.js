let supertest = require('supertest');
let app = require("../src/app");
let request = supertest(app);

describe("User register",() =>{
    test("Should register user with success", ()=>{
        let time = Date.now();
        let email = `${time}@gmail.com`;
        let user = {
                    user:"Pedro",
                    email,
                    password:"123"
                }
        return request.post("/user").send(user).then((res) => {
                                                    expect(res.statusCode).toEqual(200);
                                                    expect(res.body.email).toEqual(email);
                                                }).catch((err) =>{
                                                    fail(err);
                                                });

    });
    
});