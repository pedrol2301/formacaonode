const fs = require("fs");
const util = require('util');



class Writer{

    constructor(){
        this.writer= util.promisify(fs.writeFile);// função que transforma functions em promisses
    }

    async Write(filename,data){
        try {

            await this.writer(filename,data);
            return true; 

        } catch (error) {
            return false;
        }
    }
}
module.exports = Writer;