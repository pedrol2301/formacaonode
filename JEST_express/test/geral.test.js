//let app = require("../src/app");
let supertest = require("supertest");
let request = supertest("http://localhost:3030");

describe("Test server",() =>{

//ASSIM
    it("should respond at port 3030",()=>{
        return request.get("/").then(res => expect(res.statusCode).toEqual(200))
    });
//OU ASSIM
    /*
    it("should respond at port 3131",async ()=>{
        let res = await request.get("/")
        expect(res.statusCode).toEqual(200)
    });
    */


    
});

describe("Test routes", ()=>{
    it("Should respond vermelho when pessoa = victor",() =>{
        return request.get("/cor/victor").then(res => {
            expect(res.statusCode).toEqual(200)
            expect(res.body.cor).toEqual("vermelho")
        });
    });
})