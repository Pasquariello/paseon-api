const db = require('../lib/Postgres').db();


// exports.userAuth = async function (Credentials) {
//     try {
//         let user = await db('users').select('id', 'email').where({email: Credentials});
//         //let user = await db('users').select('email').where({email: 'taylor@pasq.net'});

//         if (user.length == 0){
//             return null
//         } //TODO: IF user update count 
//         else {
//             res = {
//                 status : 200,
//                 body   : JSON.stringify(user || {}),
//                 headers: {
//                     'Access-Control-Allow-Origin'     : '*',
//                     'Access-Control-Allow-Credentials': true,
//                     'Content-Type'                    : 'application/json',
//                 },
//             };

//             return res;
//         }
//     } 
//     catch (ex) {
//         console.log('ERROR ex', ex)
//     }
// };


    exports.getEmail = async function (email) {
        try {
            let user = await db('users').select('id', 'email', 'count').where({email: email});
            //let user = await db('users').select('email').where({email: 'taylor@pasq.net'});


            if (user.length == 0){
                return null
            } //TODO: IF user update count 
            else {
                res = {
                    status : 200,
                    body   : JSON.stringify(user || {}),
                    headers: {
                        'Access-Control-Allow-Origin'     : '*',
                        'Access-Control-Allow-Credentials': true,
                        'Content-Type'                    : 'application/json',
                    },
                };

                return res;
            }
        } 
        catch (ex) {
            console.log('ERROR ex', ex)
        }
    };

    exports.addEmail = async function (email, data) {
        
        try {
            if(email){
                 await db('users').insert({ email: email, count: 1 })
            }
    
        } catch (err) {

            console.log('ERROR', error) 
        }
    
    }

    exports.updateEmailCount = async function (data) {
        console.log('in update')

        let id = data[0].id;
        let count = data[0].count;
        let newCount = count+1;
        
        await db('users')
            .where({ id: id })
            .update({ count: newCount})
 
    }


    exports.cleanData = function(data) {
       return data.recipient_email.trim()
    }
