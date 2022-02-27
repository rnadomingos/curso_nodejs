// npm install hapi
// npm install Vision Inert hapi-swagger

// npm i hapi-jwt2

const Hapi = require('@hapi/hapi')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const Context = require('./db/strategies/base/contextStrategy')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchemas')
const HeroRoutes = require('./routes/heroRoutes')
const AuthRoutes = require('./routes/authRoutes')

const HapiSwagger = require('hapi-swagger')
const Vision = require('@hapi/vision')
const Inert = require('@hapi/inert')
const HapiJwt = require('hapi-auth-jwt2')

const JWT_SECRET = 'MEU_SEGREDÃO_123'

const app = new Hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())

}

async function main() {

    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroiSchema))

    const swaggerOptions = {
        info: {
            title: 'API Herois - #CursoNodeBR',
            version: 'v1.0'
        }
    }
     
    await app.register([
        HapiJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        // options: {
        //     expiresIn: 20
        // }
        validate: (dados, request) => {
            // verifica no banco se usuario continua ativo
            // verifica no banco se usuario continua pagando

            return {
                isValid: true // caso nao valido, false
            }
        }
    })

    app.auth.default('jwt')


    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
        ...mapRoutes(new AuthRoutes(JWT_SECRET), AuthRoutes.methods())
    ])
    

    await app.start()
    console.log('Servidor rodando na porta', app.info.port);

    return app
}

module.exports = main()
