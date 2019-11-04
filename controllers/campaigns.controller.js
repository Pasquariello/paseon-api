
const db = require('../lib/Postgres').db();
const config = require('config');
const crypto = require('crypto')



exports.newCampaign = async function (req, res) {

    console.log('Made it to the newCampaign controller', req.body);
    
    try {
        console.log('in TRY');
        let hash = crypto.createHash('md5');

        if (req.body.recipient_email){
            hash = hash.update('taylor@pasq.net').digest("hex");
        }
        
        await db('campaigns')
        .insert({
            name: req.body.campaign_name, 
            recipient_email_hashed: hash, 
            recipient_email:  req.body.recipient_email,
            form_type: req.body.form_type,
            fields:  req.body.fields[0] // TODO: fix this so it stores fields unique to forms, need to create a config file to make data structre for build it forms ? 
        }).then( function (result) {
            res = {
                status : 200,
                body   : JSON.stringify(reuslt || {}),
                headers: {
                    'Access-Control-Allow-Origin'     : '*',
                    'Access-Control-Allow-Credentials': true,
                    'Content-Type'                    : 'application/json',
                },
            };  // respond back to request
            return res;
         });
         console.log('res', res)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');

    }
    
};