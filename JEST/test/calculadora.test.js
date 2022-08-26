let app = require("../app");

describe("Operações básicas", () =>{

    it("Should return the sum of 5+5",() =>{

        let result = app.sum(5,5);
        
        expect(result).toEqual(10)
    
    });
    
    it("Should return the result of 2*5",() =>{
        let result = app.times(2,5);
    
        expect(result).toEqual(10);
    })

})
