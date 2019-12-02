
const db = require('../lib/Postgres').db();

const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');

const EmailUtil = require('../lib/Utils.js');
const sgMail = require('@sendgrid/mail');


// let email =  "taylor@pasq.net";


exports.userAuth = async function (req, res) {
    // const errors = validationResult(req);

    const { username } = req.body;
    try {
        let user = await db('users').select('*').where({email: username});

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
        if (user.length == 0){
            return res
                  .status(400)
                  .json({ errors: [{ msg: 'Invalid Credentials' }] });
        } //TODO: IF user update count

      const payload = {
        user: {
          id: user[0].id
        }
      };

      let userData = user[0] 
      console.log('=========', user)

      console.log('=========', payload)

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, userData });
        }
      )
      
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
};


exports.getUserInfo = async function (req, res) {
  const { id } = req.body;

  try {
    await db('users').select('*').where({            
      id: id  //todo this will need to be based on logged in user
    }).then(response => {
        res.json(response);
    })
  } catch (err) {
    console.log('get error', err)
  }
}

exports.sendResetLink = async function (req, res) {
  console.log('hit sendResetLink CONTROLLER FUNCTION')

  let data = req.body;
  let clean_recipient_email = data.username.trim(); 
  console.log('clean_recipient_email', clean_recipient_email)
  try {
      let emailAcctData = await EmailUtil.getEmail(clean_recipient_email);

      if (emailAcctData){
         
          let data = JSON.parse(emailAcctData.body)
          
          console.log('data', data)
          // MOVE INTO UTIL FUNCTION TODO:
          //EmailUtil.updateEmailCount(data);



      } else {

          EmailUtil.addEmail(clean_recipient_email);


      }
      sendEmail(data);
  }
  catch (ex) {
      console.log('error in mail trigger', ex)

  }




  function sendEmail(data) {
    console.log('data data data', data)
      //const data = data.body

      // let recipient_email_multi = data.recipient_email.split(",");
      // recipient_email_multi.join(',')

      // using Twilio SendGrid's v3 Node.js Library
      // https://github.com/sendgrid/sendgrid-nodejs
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
      to: data.username, // TODO does this need to be changed to the fetched data?
      from: data.from,
      subject: data.subject,
      text: 'PASSWORD REST LINK: www.google.com',
      html: '<p>'+data.body+'</p>'
      };
      sgMail.send(msg);
      return res.sendStatus(200);
  }




}

////