const db = require('mysql2');

module.exports = {
    knex: require('knex')({
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            database: 'pizzastore',
            user: 'root',
            password: 'Logiciel'
        }
    })
};