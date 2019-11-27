
const db = require('../lib/Postgres').db();
const config = require('config');
const crypto = require('crypto')



exports.getCampaigns = async function (req, res){
    console.log('hit get!')
    console.log('in dets', req.params.id)


    try {
        // await db('campaigns').select('id', 'campaign_name', 'date_created', 'count').where({            
        //    user_id: req.params.id  //todo this will need to be based on logged in user
        // }).then(response => {
        //     res.json(response);
        // })


        // MOVE THIS TO A NEW ANALYTICS GET?
        await db('campaigns')
            .leftJoin('campaign_responses', 'campaigns.id', '=','campaign_responses.campaign_id')
            .select('campaigns.id', 'campaigns.form_schema', 'campaigns.response_schema', 'campaigns.campaign_name', 'campaigns.date_created', 'campaigns.count', 'campaign_responses.field_values')
            .where({            
                user_id: req.params.id  //todo this will need to be based on logged in user
             })
            .then(response => {
                console.log('response', response)
                
                res.json(response);
            })


    
    } catch (err) {
        console.log('get error', err)
    }
}

exports.campaignDetails = async function (req, res){
    console.log('in dets', req.params.id)
    
    try {
    // CURRENT WORKING VERSION
        await db('campaigns').select('form_schema', 'response_schema', 'campaign_name', 'date_created').where({
            id: req.params.id
        }).then(data_schema => {
            db('campaign_responses').select('*').where({            
                   campaign_id: req.params.id
                }).then(form_data => {
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

        // [ 
        //     { 
        //        "tag":"input",
        //        "name":"name",
        //        "type":"text",
        //        "label":"Name",
        //        "value":"",
        //        "required":false,
        //        "placholder":""
        //     },
        //     { 
        //        "tag":"input",
        //        "name":"fav_hobbie",
        //        "type":"text",
        //        "label":"Fav Hobbie",
        //        "value":"",
        //        "required":false,
        //        "placholder":""
        //     }
        //  ]

        
        let response_schema = {}
        req.body.fields.map(field => {

             let key = field.name;
             let label_string = field.label; 
             
             response_schema[key] = {
                label: label_string,
                value: ""
             }
         });

   
        await db('campaigns').insert({
            campaign_name: req.body.campaign_name, 
            user_id: 2,  //todo this will need to be based on logged in user
            form_schema: JSON.stringify(req.body.fields),
            response_schema: JSON.stringify(response_schema)
        })
        .returning('id')
        .then( response => {
            console.log('response', response)
            res.sendStatus(200)
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