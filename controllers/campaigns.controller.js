
const db = require('../lib/Postgres').db();
const config = require('config');
const crypto = require('crypto')



exports.getCampaigns = async function (req, res){
    console.log('hit get!')
    try {
        await db('campaigns').select('id', 'campaign_name', 'date_created').where({            
           user_id: 2  //todo this will need to be based on logged in user
        }).then(response => {
            res.json(response);
        })
    } catch (err) {
        console.log('get error', err)
    }
}

exports.campaignDetails = async function (req, res){
    console.log('in dets')

    try {
    // CURRENT WORKING VERSION
        await db('campaigns').select('schema', 'campaign_name', 'date_created').where({
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
console.log(req.body.fields)
    try {
        let hash = crypto.createHash('md5');

        if (req.body.recipient_email){
            hash = hash.update('taylor@pasq.net').digest("hex");
        }
   
            await db('campaigns').insert({
                campaign_name: req.body.campaign_name, 
                user_id: 2,  //todo this will need to be based on logged in user
                schema: JSON.stringify(req.body.fields),

            })
            .returning('id')
            .then( response => {
                res.sendStatus(200)
            //     const fieldsToInsert = req.body.fields.map(field => 
            //         ({  
            //             campaign_id: response[0],
            //             tag: field.tag, 
            //             type: field.type,
            //             label: field.label,
            //             name: field.name,
            //             value: field.value,
            //             options: field.options,
            //             campaign_name: req.body.campaign_name,
            //             user_id: 2,
            //         })); 
        
            //   return db('campaign_forms').insert(fieldsToInsert)
                //   .then(() => {res.sendStatus(200)})
                //   .catch((err) => {console.log('Error', err)});
            });
    
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');

    }
};

exports.removeCampaign = async function (req, res) {
    console.log('in delete')
    console.log('TAYLOR:',req.body.idList)
    try {
        let idList = req.body.idList
        await db('campaigns')
            .whereIn('id', idList)
            .del().then((r)=>{
                console.log(r)
                res.sendStatus(200)
            })

    }catch(err){
        console.log('error deleting', err)
    }
};