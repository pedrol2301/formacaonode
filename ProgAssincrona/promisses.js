function pegarId(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(5)   
        },1500)
    })
}

function buscarEmailNoBanco(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("victorlima@guia.com.br")
        },2000);
    })
}

function enviarEmail(corpo, para){
    return new Promise((resolve, reject) => {
        setTimeout(() => {  
            var deuErro = false;
            if(!deuErro){
                resolve({time: 6, to: "victor@udemy.com"}) // Promessa OK!
            }else{
                reject("Fila cheia") // Foi mal, eu falhei :(
            }
        },4000)
    });
}


async function _acao() {
    var iduser = await pegarId();
    var emailuser = await buscarEmailNoBanco(iduser);
    enviarEmail("Olá, como vai?",emailuser).then(() => {
        console.log("Email enviado, para o usuário com id: " + iduser)
    }).catch(err => {
        console.log(err);
    });
}

console.log("Inicio!");
// pegarId().then((id) => {
//     buscarEmailNoBanco(id).then((email) => { 
//         enviarEmail("Olá, como vai?",email).then(() => {
//             console.log("Email enviado, para o usuário com id: " + id)
//         }).catch(err => {
//             console.log(err);
//         })
//     })
// })
_acao();
console.log("FIM");