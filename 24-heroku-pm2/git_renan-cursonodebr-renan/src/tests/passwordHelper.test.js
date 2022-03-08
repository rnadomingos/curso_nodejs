const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')


const SENHA = 'Renan@321123321'
const HASH = '$2b$04$WbMel0Aa0gBY78PmZeL6GuFMT6jELqqEHgGzYyjuTN29isxBacT/q'

describe(('UserHelper Suite Test'), function () {
    it('deve gerar um hash a partir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA)
        //console.log('result', result);
        assert.ok(result.length > 10)
    })
    it('deve comparar uma senha e o seu hash', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)
        assert.ok(result)
    })


} )