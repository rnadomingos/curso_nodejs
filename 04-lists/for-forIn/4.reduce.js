const { obterPessoas } = require('./service')

Array.prototype.meuReduce = function (callback, valorInicial){
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]
    for (let index=0; index <= this.length -1; index++) {
        valorFinal = callback(valorFinal, this[index], this)
    }
    return valorFinal
}

async function main (){
    try {
        const { results } = await obterPessoas('a')
        // console.log('result', results)
        // const pesos = results.map(item => parseInt(item.uid))
        // console.log('pesos', pesos)
        // // [20.2, 30.3, 40.5] = 0
        // const total = pesos.reduce((anterior, proximo) => {
        //     return anterior + proximo
        // }, 0)

        const minhaLista = [
            ['Renan', 'Domingos'],
            ['NodeBR', 'Nerdzao']
        ]

        const total = minhaLista.meuReduce((anterior, proximo) => {
            return anterior.concat(proximo)
        }, [])
        .join(' - ')

        console.log('total', total)
    } catch (error) {
        console.error('Deu Ruim', error)
    }

}

main()