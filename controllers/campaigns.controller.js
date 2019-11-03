
const db = require('../lib/Postgres').db();
const config = require('config');


exports.newCampaign = async function (req, res) {

    console.log('Made it to the newCampaign controller', req.body);
    
    try {
        console.log('in TRY');
        await db('campaigns')
        .insert({ structure: req.body.fields[0]})
    } catch (err) {
        console.error(error.message);
        res.status(500).send('Server error');

    }
    
};