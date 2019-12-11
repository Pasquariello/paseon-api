const postgres = require('../config/keys.js');

exports.db = () => {
    console.log(`Connecting`);

    let knex = require('knex')({
        client    : 'pg',
        connection: postgres.postgresURI,
        searchPath: ['public']
    });
    
    return knex;

};