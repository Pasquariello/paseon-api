
const db = require('../lib/Postgres').db();
const config = require('config');
const crypto = require('crypto')


exports.new_response = async function (req, res) {
    console.log('POSTING')
    console.log('IDDDD', req.params.id)
    console.log('=============', req.body)
    
    try {
        let hash = crypto.createHash('md5');

        if (req.body.recipient_email){
            hash = hash.update('taylor@pasq.net').digest("hex");
        }
        
        // let response_schema = {}
        // req.body.fields.map(field => {

        //      let key = field.name;
        //      let label_string = field.label; 
             
        //      response_schema[key] = {
        //         label: label_string,
        //         value: ""
        //      }
        //  });

   
        await db('campaign_responses').insert({
            campaign_id: req.params.id, 
            field_values: req.body.field_values,
        })
        //.returning(['id'])
        .then( response => {
            console.log('response', response)
        
            res.status(200).json(response)
        });
    
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');

    }
};

// [{"body": {"label": "Body", "value": "Hello this is a test body to a sent message, Did this work? I want to see if we are able to get  see the info"}, "name": {"label": "Name", "value": "Taylor"}, "subject": {"label": "Subject", "value": "Testing a stored value"}, "recipient_email": {"label": "Recipient Email", "value": "Hi! "}}, {"body": {"label": "Body", "value": "Hello this is a test body to a sent message, Did this work? I want to see if we are able to get  see the info"}, "name": {"label": "Name", "value": "Taylor"}, "subject": {"label": "Subject", "value": "Testing a stored value"}, "recipient_email": {"label": "Recipient Email", "value": "Hi! "}}, {"body": {"label": "Body", "value": "Hello this is a test body to a sent message, Did this work? I want to see if we are able to get  see the info"}, "name": {"label": "Name", "value": "Taylor"}, "subject": {"label": "Subject", "value": "Testing a stored value"}, "recipient_email": {"label": "Recipient Email", "value": "Hi! "}}, {"body": {"label": "Body", "value": "Body Test"}, "name": {"label": "Name", "value": "Sylvia"}, "subject": {"label": "Subject", "value": "sylvia subject test"}, "recipient_email": {"label": "Recipient Email", "value": "oooo! "}}]

