const ICrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor(){
        super()
        this._driver = null
        this._herois = null
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true;
        } catch (error) {
            console.log('fail', error)
            return false;
        }
    }

    async defineModel() {
        this._herois = this._driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false 
        })
    
        await this._herois.sync()
    }

    async create(item){
        const { 
            dataValues 
        } = await this._herois.create(item)

        return dataValues
    }

    async update(id, item) {
        //console.log('item', item)
        const r = await this._herois.update(item, { where: {id : id}})
        //console.log('r', r)
        return r
    }

    async delete(id) {
        const query = id ? { id } : {}
        return this._herois.destroy({where: query})    
    }

    async read(item = {}){
        return this._herois.findAll({ where: item, raw: true })
    }


    async connect() {
        this._driver = new Sequelize(
            'heroes',
            'renan',
            'minhasenhasecreta',
            {
                host: '192.168.15.111',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorAlias: false
            }

        )
        await this.defineModel()

    }
}

module.exports = Postgres