
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

       

            await db('campaigns').insert({
                 campaign_name: req.body.campaign_name, 
                //  user_id: 1  //todo this will need to be based on logged in user
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
                        user_id: 1,
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