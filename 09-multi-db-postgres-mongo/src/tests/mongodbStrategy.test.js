const assert = require('assert')
const MongoDB = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')
const { deepEqual } = require('assert')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
}
const MOCK_HEROI_DEFAULT = {
    nome: `Homem Arannha=${Date.now()}`,
    poder: 'Super Teia'
}
const context = new Context(new MongoDB())
describe('MongoDB Suite de Testes', function () {
    this.beforeAll(async () => {
        await context.connect()
        await context.create(MOCK_HEROI_DEFAULT)
    } )
    it('verificar conexao', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado'


        assert.deepEqual(result, expected)
    })

    it('cadastrar', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
    })

    it('listar', async () => {
        const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome })
        const result = {
            nome, poder
        }
        assert.deepEqual(result, MOCK_HEROI_DEFAULT)
    })
})
