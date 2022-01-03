var Reader = require('./Reader');
var Processor = require('./Processor');
var Table = require('./Table');
var HtmlParser = require("./HtmlParser");
var Writer = require("./Writer");
const PDFWriter = require('./PDFWriter');

var leitor = new Reader();
var escritor = new Writer();

async function main() {
    
    var data = await leitor.Read("./lista.csv");
    var processdata = Processor.Process(data);
    var tbl = new Table(processdata);
    //console.log(tbl.header);
    //console.log(tbl.rows);

    var html = await HtmlParser.Parse(tbl);

    escritor.Write(Date.now()+".html",html);
    PDFWriter.WritePDF(Date.now()+".PDF",html);

    //console.log(html);
}

main();