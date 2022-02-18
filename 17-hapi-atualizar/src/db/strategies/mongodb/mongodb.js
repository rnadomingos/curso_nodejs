const ICrud = require('./../interfaces/interfaceCrud')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectado'
}

class MongoDB extends ICrud {
    constructor(connection, schema) {
        super()
        this.schema = schema
        this.connection = connection
    }

    async isConnected() {
        const state = STATUS[this.connection.readyState]
        if (state === 'Conectado') return state;
        
        if (state !== 'Conectando') return state 
        
        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this.connection.readyState]

    }
    static connect() {
        Mongoose.connect('mongodb://renan:minhasenhasecreta@192.168.15.111:27017/herois',
            { useNewUrlParser: true }, function (error) {
                if (!error) return;
                console.log('Falha na conexão', error);
            })

        const connection = Mongoose.connection
        connection.once('open', () => console.log('database rodando'))
        return connection

    }
    
    create(item) {
        return this.schema.create(item)
    }

    read(item, skip=0, limit=10) {
        return this.schema.find(item).skip(skip).limit(limit)
    }

    update(id, item) {
        return this.schema.updateOne({ _id: id }, { $set: item })
    }

    delete(id) {
        return this.schema.deleteOne({ _id: id })
    }
}

module.exports = MongoDB