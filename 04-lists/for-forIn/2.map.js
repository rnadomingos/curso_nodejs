const servie = require('./service')

Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = []
    for (let indice = 0; indice <= this.length -1; indice ++) {
        const resultado = callback(this[indice], indice)
        novoArrayMapeado.push(resultado)
    }

    return novoArrayMapeado;
}

async function main(){
    try {
        const results = await servie.obterPessoas('a')
        
        // EXEMPLO 1
        //const names = []
        // results.results.forEach(function (item) {
        //     names.push(item.name)
        // })
        
        // EXEMPLO 2
        // const names = results.results.map(function (pessoa){
        //     return pessoa.name
        // })

        // EXEMPLO 3
        //const names = results.results.map((pessoa) => pessoa.name)

        // EXEMPLO 4 - IMPLEMENTACAO PROPRIA DO MAP
        const names = results.results.meuMap(function (pessoa, indice) {
            return `[${indice}]${pessoa.name}`
        }) 
        //console.log('names', names)

        

        console.log('names', names)
    } catch (error) {
        console.error('Deu Ruim', error)
    }
}

main()