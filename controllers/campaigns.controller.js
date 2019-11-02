
const db = require('../lib/Postgres').db();

const config = require('config');


exports.newCampaign = async function (req, res) {

    console.log('Made it to the newCampaign controller', req.body);
    
};