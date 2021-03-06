const axios = require('axios')
const URL = `https://www.swapi.tech/api/people`


async function obterPessoas(nome){
    const url = `${URL}/?search=${nome}&format=json`
    const response = await axios.get(url)
    return response.data
}

// TESTE DO SERVICE CRIADO
/* obterPessoas('r2')
    .then(function (resultado){
        console.log('resultado', resultado)
    })
    .catch(function (error){
        console.error('Deu Ruim', error)
    })
 */    

module.exports = {
    obterPessoas
}