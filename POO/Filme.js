class Filme{
    constructor(){
        this.titulo  = '';
        this.ano     = '';
        this.genero  = '';
        this.diretor = '';
        this.atores  = [];
        this.duracao = '';
    }

    Reproduzir(){
        console.log('Play |>');
    }

    Pausar(){
        console.log('Pause ||');
    }

    Avancar(){
        console.log('Fast-Foward >>');
    }
    Fechar(){
        console.log('Close X');
    }
}

var vingadores = new Filme();

vingadores.Reproduzir();