## Instalação do Postgres no Docker

## Rodando docker no IP 192.168.15.111 (notelenovo)
docker run \
    --name postgres \
    -e POSTGRES_USER=renan \
    -e POSTGRES_PASSWORD=minhasenhasecreta \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres:alpine

docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer


## MONGODB

docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -d \
    mongo:4

docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

docker exec -ti mongodb \
    mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'renan', pwd: 'minhasenhasecreta', roles:[{role: 'readWrite', db: 'herois'}]})"



# Commands Manager Heroku    

 sudo npm i -g heroku
 heroku login
 heroku apps:list
 heroku apps:create cursonodebr
 heroku git:remote --app cursonodebr
 heroku apps:list
 heroku apps:create cursonodebr-renan
 heroku apps:list
 heroku git:remote --app cursonodebr-renan
 git push heroku master
 heroku logs