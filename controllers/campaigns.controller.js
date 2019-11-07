
const db = require('../lib/Postgres').db();
const config = require('config');
const crypto = require('crypto')
const { QueryBuilder, Model } = require('objection');



exports.getCampaigns = async function (req, res){
    console.log('hit get!')
    try {
        await db('campaigns').select('id', 'campaign_name', 'fields').where({            
           user_id: 2  //todo this will need to be based on logged in user
        }).then(response => {
            console.log('resp', response)
            res.json(response);
            console.log('DID I GET HERE')
        })
    } catch (err) {
        console.log('get error', err)
    }
}

exports.campaignDetails = async function (req, res){
    console.log('hit details!')
    console.log(req.params)
    try {
    // CURRENT WORKING VERSION
        await db('campaigns').select('schema').where({
            id: req.params.id
        }).then(data_schema => {
            db('campaign_responses').select('*').where({            
                   campaign_id: req.params.id
                }).then(form_data => {
                //    console.log('TAYLOR', form_data)
                    res.json({
                        data_schema,
                        form_data,
                    });
               
                });
        });



    } catch (err) {
        console.log('get error', err)
    }
}

exports.newCampaign = async function (req, res) {

    console.log('Made it to the newCampaign controller', req.body);
    
    try {
        console.log('in TRY');
        let hash = crypto.createHash('md5');

        if (req.body.recipient_email){
            hash = hash.update('taylor@pasq.net').digest("hex");
        }
   
            await db('campaigns').insert({
                campaign_name: req.body.campaign_name, 
                user_id: 2,  //todo this will need to be based on logged in user
                schema: req.body.fields,

            })
            .returning('id')
            .then( response => {
                console.log('response.id', response[0])
                const fieldsToInsert = req.body.fields.map(field => 
                    ({  
                        campaign_id: response[0],
                        tag: field.tag, 
                        type: field.type,
                        label: field.label,
                        name: field.name,
                        value: field.value,
                        options: field.options,
                        campaign_name: req.body.campaign_name,
                        user_id: 2,
                    })); 
        
              return db('campaign_forms').insert(fieldsToInsert)
                  .then(() => { console.log('Succeess')})
                  .catch((err) => {console.log('Error', err)});
            });
    
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');

    }
};


{"{\"type\":\"email\",\"tag\":\"input\",\"label\":\"Recipient Email\",\"name\":\"recipient_email\"}","{\"type\":\"text\",\"tag\":\"input\",\"label\":\"Name\",\"name\":\"name\"}","{\"type\":\"text\",\"tag\":\"input\",\"label\":\"Subject\",\"name\":\"subject\"}","{\"type\":\"\",\"tag\":\"textarea\",\"label\":\"Body\",\"name\":\"body\"}"}