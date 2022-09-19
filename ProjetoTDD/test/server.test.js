let supertest = require('supertest');
let app = require("../src/app");
let request = supertest(app);

test("The application should respond at port 3131",()=>{
    return request.get("/").then(res => {
        let status = res.statusCode
        expect(status).toEqual(200)
    }).catch(err =>{
        fail(err);
    })
});