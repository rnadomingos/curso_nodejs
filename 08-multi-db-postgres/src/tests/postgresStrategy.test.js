const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy')
const { isTypedArray } = require('util/types')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = {
    nome: 'Gaviao Negro',
    poder: 'Flexas'
}

describe('Postgres Strategy', function () {
    this.timeout(Infinity)
    this.beforeAll(async function () {
        await context.connect()
    })
    it('PostgresSQL Connection', async function() {
        const result = await context.isConnected()
        assert.equal(result, true)
    })
    it('cadastrar', async function () {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        console.log('result', result)
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('listar', async function () {

        //pegar a primeira posição do array
        // const posicaoZero = result[0]
        // const [posicao1, posicao2] = ['esse é o 1', 'esse é o 2'] 
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
})