var database = require("./database");

// INSERT
// var dados = [
//     {
//         nome : 'GTA',
//         preco : 0.00
//     },
//     {
//         nome : 'LOL',
//         preco : 20.00
//     },
//     {
//         nome : 'DOTA',
//         preco : 50
//     }
// ];


// database.insert(dados).into("games").then(data =>{
//     console.log(data);
// }).catch(err =>{
//     console.log(err);
// });

// SELECT
database.select().table('games').then(data =>{
    console.log(data)
}).catch(err =>{
    console.log(err);
});

// WHERE
// database.whereRaw("nome ='COD' ").table('games').then(data =>{
//     console.log(data)
// }).catch(err =>{
//     console.log(err);
// });

