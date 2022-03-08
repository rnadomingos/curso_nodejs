const ICrud = require('./../interfaces/interfaceCrud')
const Sequelize = require('sequelize')


class Postgres extends ICrud {
    constructor(connection, schema){
        super()
        this._connection = connection
        this._schema = schema
    }

    async isConnected() {
        try {
            await this._connection.authenticate()
            return true;
        } catch (error) {
            console.log('fail', error)
            return false;
        }
    }

    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name, schema.schema, schema.options 
        )
        await model.sync()
        return model
    }

    async create(item){
        const { 
            dataValues 
        } = await this._schema.create(item)

        return dataValues
    }

    async update(id, item, upsert = false) {
        //console.log('item', item)
        const fn = upsert ? 'upsert' : 'update'
        const r = await this._schema[fn](item, { 
            where: {id : id
            }
        })
        //console.log('r', r)
        return r
    }

    async delete(id) {
        const query = id ? { id } : {}
        return this._schema.destroy({where: query})    
    }

    async read(item = {}){
        return this._schema.findAll({ where: item, raw: true })
    }


    static async connect() {
        const SSL_DB = process.env.SSL_DB === 'true' ? true : undefined
        const SSL_DB_REJECT = process.env.SSL_DB_REJECT === 'false' ? false : undefined
        
        let dialectOptions = {}
        if (SSL_DB) {
            dialectOptions = {
                ssl: {
                    require: SSL_DB,
                    rejectUnauthorized: SSL_DB_REJECT,
                }
            };
        };
        const connection = new Sequelize(process.env.POSTGRES_URL, {
            operatorAliases: false,
            logging: false,
            quoteIdentifiers: false,
            dialectOptions

        });
        return connection

    }
}

module.exports = Postgres