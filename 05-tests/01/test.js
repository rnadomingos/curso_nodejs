const assert = require('assert')

const { 
    obterPessoas 
} = require('./services')


// INSTALAMOS O PACOTE NOCK, PARA SIMULAR REQUISIÇÕES
const nock = require('nock')

describe('Star Wars Tests', function (){
    this.beforeAll(() => {
        const response =  {result: {
            properties: {
              height: '96',
              mass: '32',
              hair_color: 'n/a',
              skin_color: 'white, blue',
              eye_color: 'red',
              birth_year: '33BBY',
              gender: 'n/a',
              created: '2022-01-10T12:19:27.162Z',
              edited: '2022-01-10T12:19:27.162Z',
              name: 'R2-D2',
              homeworld: 'https://www.swapi.tech/api/planets/8',
              url: 'https://www.swapi.tech/api/people/3'
            },
            description: 'A person within the Star Wars universe',
            _id: '5f63a36eee9fd7000499be44',
            uid: '3',
            __v: 0
        }
    }
    nock('https://www.swapi.tech/api/people')
        .get('/3')
        .reply(200, response)
})
    it('deve buscar o r2d2 com o formato correto', async () => {
        const expedted = [{
            nome: 'R2-D2', 
            peso: '96'
        }]
        const idBase = `3`
        const resultado = await obterPessoas(idBase)
        assert.deepEqual(resultado, expedted)
    })
})