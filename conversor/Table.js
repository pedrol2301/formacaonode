class Table{

    constructor(arr){
        this.header = arr[0];
        arr.shift()
        this.rows = arr;
    }

    get RowCount(){ //Campos virtuais
        return this.rows.length
    }
    get ColumnCount(){ //Campos virtuais
        return this.header.length
    }
}

module.exports = Table;