const { 
    deepEqual,
    ok
} = require('assert')

const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = { 
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

describe('Suite de manipulação de Herois', () => {
    
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    })

    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        // abaixo é utilizado a tecnica de destructor "[resultado]" desta forma ele retorno o primeiro item do array no caso o item "resultado[0]"
        // caso queira usar itens da segunda posição utilize [resultado, posicao2, posicao3]
        const [resultado] = await database.listar(expected.id)
        
        deepEqual(resultado, expected)
    })
    it('deve cadastrar um heroi, usando arquivos', async () =>{
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)

        deepEqual(actual, expected)
    })
})