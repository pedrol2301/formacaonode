const fs = require("fs");
const util = require('util');



class Reader{

    constructor(){
        this.reader= util.promisify(fs.readFile);// função que transforma functions em promisses
    }

    async Read(filepath){
        try {

            return await this.reader(filepath,{encoding:'utf-8'});

        } catch (error) {
            return undefined;
        }
    }
}
module.exports = Reader;