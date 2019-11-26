const db = require('../lib/Postgres').db();
const config = require('config');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');




exports.register_user = async function (req, res){
    console.log('hit register controllor!')

    let user_obj = {
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        company: req.body.company, 
        account_type: 'basic'
    }

try {
        let user = await db('users').select('email').where({email: user_obj.email});

        if (!user.length) {

        let my_user = await db('users').insert({
            first_name: user_obj.first_name, 
            last_name: user_obj.last_name,
            email: user_obj.email, 
            company: user_obj.company,
            account_type: user_obj.account_type
        }).returning('*').then(resp => {
            console.log('resp=========================', resp)

        const payload = resp[0];
        console.log('payload', payload);
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token, payload });
          }
        )

            
        });
        console.log('my_user=========================', my_user)

        }
        // if (!user) {
        //   return res
        //     .status(400)
        //     .json({ errors: [{ msg: 'Invalid Credentials' }] });
        // }
        //   if (user.length == 0){
        //       return res
        //             .status(400)
        //             .json({ errors: [{ msg: 'Invalid Credentials' }] });
        //   } //TODO: IF user update count
  



        // const payload = {
        //   user: {
        //     id: user[0].id
        //   }
        // };
  
        // let userData = user[0] 
        // console.log('=========', user)
  
        // console.log('=========', payload)
  
        // jwt.sign(
        //   payload,
        //   config.get('jwtSecret'),
        //   { expiresIn: 360000 },
        //   (err, token) => {
        //     if (err) throw err;
        //     res.json({ token, userData });
        //   }
        // )
        






        // await db('users').select('email').where({
        //     email: user_obj.email
        // }).then(resp=>{

        //     if (!resp.length){
        //     console.log('not existing')
        //          let my_user = db('users').insert({
        //                 first_name: user_obj.first_name, last_name: user_obj.last_name, email: user_obj.email, company: user_obj.company
        //         }).returning('*') .then( response => {
        //             console.log('response', response.json)
        //             const payload = {
        //                 my_user: {
        //                   id: response[0].id
        //                 }
        //               };
        //               console.log('my_user', my_user)
        //             res.sendStatus(200)
        //                     jwt.sign(
        //                     payload,
        //                     config.get('jwtSecret'),
        //                     { expiresIn: 360000 },
        //                     (err, token) => {
        //                       if (err) throw err;
        //                       res.json({ token, my_user });
        //                     }
        //                   )
        //         });
        //     }  

                    // if (!user) {
                    //     return res
                    //       .status(400)
                    //       .json({ errors: [{ msg: 'Invalid Credentials' }] });
                    //   }
                    //     if (user.length == 0){
                    //         return res
                    //               .status(400)
                    //               .json({ errors: [{ msg: 'Invalid Credentials' }] });
                    //     } //TODO: IF user update count
                
                    //     console.log('=========', )

                    //     const payload = {
                    //         user: {
                    //           id: user.id
                    //         }
                    //       };
                    //       console.log('use =============== r', user)
                    //       console.log('payload', payload);


                    //     jwt.sign(
                    //         payload,
                    //         config.get('jwtSecret'),
                    //         { expiresIn: 360000 },
                    //         (err, token) => {
                    //           if (err) throw err;
                    //           res.json({ token, user });
                    //         }
                    //       )
                  // })
                     //}
                        
      
    
 
        
    } catch (err) {
        console.log('get error', err)
    }
}

//TODO on registration create and set JWT token
// send response if email already exists