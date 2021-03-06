const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom');
const { baseModelName } = require('../db/strategies/mongodb/schemas/heroisSchemas');
const failAction = (request, headers, erro) => {
    throw erro;
}

const headers = Joi.object({
    authorization: Joi.string().required()
}).unknown()

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                tags: ['api'],
                description: 'Deve listar herois',
                notes: 'pode paginar resultados e filtrar por nome',
                validate: {
                    //payload -> body
                    //headers -> header
                    //params -> na URL: id
                    //query -> ?skip=10&limit=100
                    failAction,
                    query: Joi.object({
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }),
                    headers,

                }
            },
            handler: (request, headers) => {
                try {
                    const {
                        skip,
                        limit,
                        nome
                    } = request.query

                    const query = nome ? { 
                        nome: {$regex: `.*${nome}*.`} 
                    } : {}

                    return this.db.read(nome ? query : {}, skip, limit)

                } catch (error) {
                    return Boom.internal()
                }
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'Deve cadastrar herois',
                notes: 'deve cadastrar heroi por nome e poder',
                validate: {
                    failAction,
                    headers,
                    payload: Joi.object({
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(100)
                    })

                }
            },
            handler: async (request) => {
                try {
                    const { nome, poder } = request.payload
                    const result = await this.db.create({ nome, poder })
                    
                    return {
                        message: 'Heroi cadastrado com sucesso!',
                        _id: result._id
                    }
                    
                } catch (error) {
                    console.log('DEU RUIM', error)
                    return Boom.internal()
                }
            }
        }
    }

    update() {
       return {
           path: '/herois/{id}',
           method: 'PATCH',
           config: {
               tags: ['api'],
               description: 'Deve atualizar heroi por ID',
               notes: 'Pode atualizar qualquer campo',
               validate: {
                   params: Joi.object({
                       id: Joi.string().required()
                   }),
                   headers,
                   payload: Joi.object({
                       nome: Joi.string().min(3).max(100),
                       poder: Joi.string().min(3).max(100),

                   })
               }
           },
           handler: async (request) => {
               try {
                   const {
                       id
                   } = request.params;

                   const { 
                       payload 
                    } = request
                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)

                    const result = await this.db.update(id, dados)

                    if (result.modifiedCount !== 1) 
                        return Boom.preconditionFailed('ID n??o encontrado no Bando de Dados')
                    
                    return {
                        message: 'Heroi atualizado com sucesso!'
                    }
                   
               } catch (error) {
                   console.error('DEU RUIM', error)
                   return Boom.internal()

                   
               }
           }
       } 
    }

    delete() {
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            config: {
                tags: ['api'],
                description: 'Deve deletar herois por ID',
                notes: 'O id tem que ser v??lido',
                validate: {
                    failAction,
                    headers,
                    params: Joi.object({
                        id: Joi.string().required()
                    }),
                }

            },
            handler: async (request) => {
                try {
                    const { id } = request.params
                    const result = await this.db.delete(id)

                    if (result.deletedCount !== 1) 
                        return Boom.preconditionFailed('ID n??o encontrado no Bando de Dados')


                    return {
                        message: 'Heroi Removido com sucesso!'
                    }
                    
                } catch (error) {
                    console.log('DEU RUIM', error)
                    return Boom.internal()

                }
            }
        }
    }

}

module.exports = HeroRoutes