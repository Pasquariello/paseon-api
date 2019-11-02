const postges = require('../config/keys.js');

exports.db = () => {
    console.log(`Connecting`);

    let knex = require('knex')({
        client    : 'pg',
        connection: postges.postgesURI,
        searchPath: ['public']
    });
    
    return knex;

};