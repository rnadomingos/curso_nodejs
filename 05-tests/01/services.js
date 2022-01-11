const { 
    get
} = require('axios')

const URL = `https://www.swapi.tech/api/people`

async function obterPessoas(uid) {
    const url = `${URL}/${uid}`
    const lista = []
    const result = await get(url)
    lista.push(result.data.result.properties)

    return lista.map(mapearPessoas)
}

function mapearPessoas(item){

    return {
        nome: item.name,
        peso: item.height
    }
}

module.exports = {
    obterPessoas
}