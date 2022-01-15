const { Command } = require("commander");
const { Hook } = require("mocha");
const Database = require('./database')
const Heroi = require('./heroi')

async function main(){

    const Commander = new Command()

    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Heroi")
        .option('-p, --poder [value]', "Poder do Heroi")
        .option('-i, --id [value]', "ID do Heroi")

        .option('-c, --cadastrar', "Cadastrar um Heroi")
        .option('-l, --listar', "Lista os Herois")
        .option('-r, --remover [value]', "Remove um heroi pelo id")
        .option('-a, --atualizar [value]', "Atualizar um heroi pelo id")

    Commander.parse(process.argv)
    const options = Commander.opts();

    const heroi = new Heroi(options);

    try {
        if(options.cadastrar){
            delete heroi.id
            const resultado = await Database.cadastrar(heroi)
            if(!resultado){
                console.error('Heroi não foi cadastrado')
                return;
            }
            console.log('Heroi Cadastrado com sucesso')
        }

        if(options.listar) {
            const resultado = await Database.listar()
            console.log(resultado)
            return;
        }
        if(options.remover) {
            const resultado = await Database.remover(heroi.id)
            if(!resultado) {
                console.error('Não foi possível remover o Heroi')
                return;
            }
            console.log('Heroi removido com sucesso!')
        }
        if(options.atualizar) {
            const idParaAtualizar = parseInt(options.atualizar);
            // remover todas as chaves que estiverem com undefined | null
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            console.log('dado:', heroi)
            console.log('dado:', dado)
            console.log('heroiAtualizar:', heroiAtualizar)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
            if(!resultado) {
                console.error('Não foi possivel atualizar o Heroi')
                return;
            }
            console.log('Heroi Atualizado com sucesso')

        }
        
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

main()