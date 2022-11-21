let supertest = require('supertest');
let app = require("../src/app");
let request = supertest(app);


let mainUser = {
    name:"Jorge",
    email:"pedro@gmail.com",
    password:"123",
};

beforeAll(()=>{
    //executa antes dos testes

    return request.post("/user").send(mainUser)
    .then( res =>{

    }).catch(err =>{
        console.log(err)
    })
});

afterAll(()=>{
    //executa depois dos testes
    return request.delete(`/user/${mainUser.email}`)
            .then(res =>{})
            .catch(err =>{
                console.log(err)
            })
});
beforeEach(()=>{
    //executa antes de cada teste
});
afterEach(()=>{
    //executa depois de cada teste
});

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

    test("Should block users with empty information",() =>{

        let user = {
                    user:"",
                    email:"",
                    password:""
                }
        return request.post("/user")
                .send(user)
                .then((res) => {
                        expect(res.statusCode).toEqual(400);
                }).catch((err) =>{
                        fail(err);
                });

    });

    test("Should block duplicated email",() =>{

        let time = Date.now();
        let email = `${time}@gmail.com`;
        let user = {
                    user:"Pedro",
                    email,
                    password:"123"
                }
        return request.post("/user")
                .send(user)
                .then((res) => {
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.email).toEqual(email);
                    
                    return request.post("/user")
                    .send(user)
                    .then((res) =>{
                        expect(res.statusCode).toEqual(406);
                        expect(res.body.error).toEqual("Email already in use!");
                    }).catch(err =>{
                        fail(err);
                    })
                }).catch((err) =>{
                    fail(err);
                });

    });
    
});