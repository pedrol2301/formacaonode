var http = require("http");

http.createServer(function (require,response){
    response.end("Bem Vindo!");
}).listen(8181);