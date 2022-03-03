/* 
docker ps

docker container exec -it mongodb \
mongo -u renan -p minhasenhasecreta --authenticationDatabase herois

*/

//Exibe Banco de Dados
show dbs

//Altera o contexto para uma database especifica
use herois

//Exibe as Colecoes (Tabelas)
show collections

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})  

// Lista dados da coleção
// db.[collection].find()
db.herois.find()
db.herois.find().pretty()

for(let i=0; i<= 50000; i ++) {
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

db.herois.count()
db.herois.findOne()
// Find com Limit e ordenação decrescente
db.herois.find().limit(1000).sort({ nome: -1})
// Find retornando somente a coluna específica, como o id o mongo traz por padrão, é preciso informar (_id: 0) para não aparecer no resultado da busca
db.herois.find({}, {poder: 1, _id: 0})


// create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})          

//read 
db.herois.find()

//update substituindo o objeto todo!
db.herois.update({ _id: ObjectId("61ffaf005796bd7e7860e80e")},
                 {nome: 'Mulher Maravilha'})
// Antes: 
    /* 
    {
	"_id" : ObjectId("61ffaf005796bd7e7860e80e"),
	"nome" : "Flash",
	"poder" : "Velocidade",
	"dataNascimento" : "1998-01-01"
}

    */
// Depois: { "_id" : ObjectId("61ffaf005796bd7e7860e80e"), "nome" : "Mulher Maravilha" }

// update apenas do campo selecionado

db.herois.update({_id: ObjectId("61ffaf185796bd7e78610f1e")}, 
                 {$set: {nome: 'Lanterna Verde'}})

// Antes:
/* 
{
	"_id" : ObjectId("61ffaf185796bd7e78610f1e"),
	"nome" : "Clone-9999",
	"poder" : "Velocidade",
	"dataNascimento" : "1998-01-01"
}
*/
// Depois: 
/* 
 {
	"_id" : ObjectId("61ffaf185796bd7e78610f1e"),
	"nome" : "Lanterna Verde",
	"poder" : "Velocidade",
	"dataNascimento" : "1998-01-01"
}
*/                 

//update altera apenas o primeiro registro encontrado, mesmo existindo mais registros com o mesmo nome do campo, para alterar mais de um, utilize updateMany()
db.herois.update({ poder: 'Velocidade'},
                 { $set: {poder: 'super força'}})

// updateMany
db.herois.updateMany({ poder: 'super força'},
                 { $set: {poder: 'Velocidade'}})

// delete

//remove todos os registros
db.herois.remove({})

// remove dado especifico
db.herois.remove({ nome: 'Mulher Maravilha' })