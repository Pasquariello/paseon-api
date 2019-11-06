
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

        // await db('campaign_responses').select('id', 'campaign_id', 'field', 'submission_id').groupBy('campaign_responses.submission_id').then(resp =>{
        //     console.log('resp', resp)
        // })

        // .leftJoin('accounts', function() {
        //     this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
        //   })

        //  SELECT films.id, films.title, films.genre, count(*) as number_of_reviews FROM films LEFT JOIN reviews ON films.id = reviews.film_id GROUP BY films.id;
        // db.select('campaigns.id').leftJoin('campaign_responses', function(){
        //     this.on('campaign_responses.campaign_id', '=', 'campaigns.id')
        //     }).groupBy('campaign_forms.submission_id').then(d=>{
        //         console.log('hi', d)
        // })

     
        // db.from('campaigns')
        // .innerJoin('campaign_responses', 'campaigns.id', 'campaign_responses.campaign_id')
        // .then(d => {
        //     console.log('======', d)
        // })

        // db.select('submission_id', 'field').from('campaign_responses').groupBy('submission_id', 'field')
        // .then(d => {
        //     console.log('======', d)
        // })
    
        ////////////////////////////////////////////////
        class Resp extends Model {

            // Table name is the only required property.
            static get tableName() {
              return 'campaign_responses';
            }
          
            // Each model must have a column (or a set of columns) that uniquely
            // identifies the rows. The column(s) can be specified using the `idColumn`
            // property. `idColumn` returns `id` by default and doesn't need to be
            // specified unless the model's primary key is something else.
            static get idColumn() {
              return 'id';
            }
          
            // Methods can be defined for model classes just as you would for
            // any JavaScript class. If you want to include the result of these
            // method in the output json, see `virtualAttributes`.
            // fullName() {
            //   return this.firstName + ' ' + this.lastName;
            // }
          
            // Optional JSON schema. This is not the database schema!
            // No tables or columns are generated based on this. This is only
            // used for input validation. Whenever a model instance is created
            // either explicitly or implicitly it is checked against this schema.
            // See http://json-schema.org/ for more info.
            static get jsonSchema () {
              return {
                type: 'object',
                //required: ['firstName', 'lastName'],
          
                properties: {
                  id: {type: 'integer'},
                  submission_id: {type: 'integer'},
                //   firstName: {type: 'string', minLength: 1, maxLength: 255},
                //   lastName: {type: 'string', minLength: 1, maxLength: 255},
                //   age: {type: 'number'},
          
                  // Properties defined as objects or arrays are
                  // automatically converted to JSON strings when
                  // writing to database and back to objects and arrays
                  // when reading from database. To override this
                  // behaviour, you can override the
                  // Model.jsonAttributes property.
                //   address: {
                //     type: 'object',
                //     properties: {
                //       street: {type: 'string'},
                //       city: {type: 'string'},
                //       zipCode: {type: 'string'}
                //     }
                //   }
                }
              };
            }
        }
            ////////////////////////////////////////////////

            // const resp = await Resp.query(db)
            // console.log('REEEE', resp )
   
           

        // db('orders')
        // .select(
        //   'orders.*', 
        // )
        // .leftJoin(
        //   knex('charts')
        //     .select('id_order', knex.raw('count(*) as ??', ['unread']))
        //     .where('read_by_use', 0).groupBy('id_order').as('x'), 
        //   'x.id_order', 
        //   'orders.id_order'
        // )
        // .where('id_customer', 42)
        // .orderBy('date_submitted')


        // await db('campaigns').select('fields').where({
        //     id: req.params.id
        // }).then(data_schema => {
        //     db('campaign_forms').where({            
        //            campaign_id: req.params.id
        //         }).then(form_data => {
        //             console.log('TAYLOR', data_schema, form_data)
        //             res.json({
        //                 data_schema,
        //                 form_data
        //             });
        //         })
        // })



// await db('campaign_responses').distinct(db.raw('ON (submission_id) submission_id, field'))
//   .orderBy('submission_id').then(d => {
//       console.log('SYLS', d)
//   })

// await db
//     .select([
//         // Select all fields from table a
//         'campaign_responses.*',
//         // Select only id field from table b
//         'campaign_forms.id as b_id'
//     ])
//     .from('table_a')
//     .leftJoin(
//         'campaign_responses.*',
//         'campaign_forms',
//         'campaign_forms.id'
//     ).then(t => {
//         console.log('==========', t)
//     });
// CURRENT WORKING VERSION
        // await db('campaigns').select('fields').where({
        //     id: req.params.id
        // }).then(data_schema => {
        //     db('campaign_responses').select('field_values').where({            
        //            campaign_id: req.params.id
        //         }).then(form_data => {
        //         //    console.log('TAYLOR', form_data)
        //           db('campaign_responses').distinct('submission_id').then( data =>{
        //             res.json({
        //                 data_schema,
        //                 form_data,
        //                 data
        //             });
        //           })
               
        //         })
        // })
        await db('campaigns').select('fields').where({
            id: req.params.id
        }).then(data_schema => {
            db('campaign_responses').select('*').where({            
                   campaign_id: req.params.id
                }).then(form_data => {
                //    console.log('TAYLOR', form_data)
                  db('campaign_responses').distinct('submission_id').then( data =>{
                    res.json({
                        data_schema,
                        form_data,
                        data
                    });
                  })
               
                })
        })



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
                fields: req.body.fields,

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