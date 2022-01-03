class Processor{

    static Process(data){ //Quebra as linhas do arquivo .csv
      var a = data.split('\r\n')
      var rows = [];
      a.forEach(row => { //Quebra as colunas de cada linha do arquivo .csv
          var arr = row.split(",");
          rows.push(arr);
      });
      return rows;
    }
}

module.exports = Processor;