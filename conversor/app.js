var Reader = require('./Reader');
var Processor = require('./Processor');
var Table = require('./Table');

var leitor = new Reader();

async function main() {
    
    var data = await leitor.Read("./lista.csv");
    var processdata = Processor.Process(data);
    var tbl = new Table(processdata);
    //console.log(tbl.header);
    console.log(tbl.rows);
}

main();