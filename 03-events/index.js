const EventEmitter = require('events')
class MeuEmissor extends EventEmitter{

}
const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click'
meuEmissor.on(nomeEvento, function (click){
    console.log('um usuario clicou', click)
})

// meuEmissor.emit(nomeEvento, 'na barra de rolagem')
// meuEmissor.emit(nomeEvento, 'no ok')

// let count = 0
// setInterval(function() {
//     meuEmissor.emit(nomeEvento, 'no ok ' + (count++))
    
// }, 1000);

const stdin = process.openStdin()

stdin.addListener('data', function (value){
    console.log(`Você digitou: ${value.toString().trim()}`)
})

// atenção ao usuario com promises pois elas são feitas apenas para executar uma vez e Eventos são para manipular ações continuas. Exemplo abaixo, executa apenas 1 vez:
/* function main(){
    return new Promise(function(resolve, reject){
        stdin.addListener('data', function(value){
            return resolve(value)
        })
    })
}

main().then(function(resultado){
    console.log('resultado', resultado.toString())
}) */