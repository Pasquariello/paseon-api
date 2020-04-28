const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const EmailUtil = require('../lib/Utils.js');

// let email =  "taylor@pasq.net";

exports.login = async function (req, res) {
   console.log('HIT LOGIN')

   let data = req.body;
   console.log(data)
    let clean_user = data.username.trim();


    try {
        let userData = await EmailUtil.userAuth(clean_user);

        if (userData){
           
            let data = JSON.parse(userData.body)
            
            console.log('data', data)
            res.send(200);

 
        } else {
            console.log('faileds')
            res.send(400);

        }
    }
    catch (ex) {
        console.log('error in auth trigger', ex)

    }


}

exports.sendEmail = async function (req, res) {

    console.log('====', req.body)
 
    let data = req.body;
    let clean_recipient_email = data.recipient_email.trim()

    try {
        let emailAcctData = await EmailUtil.getEmail(clean_recipient_email);

        if (emailAcctData){
           
            let data = JSON.parse(emailAcctData.body)
            
            console.log('data', data)
            // MOVE INTO UTIL FUNCTION TODO:
            // EmailUtil.updateEmailCount(data);


 
        } else {

            EmailUtil.addEmail(clean_recipient_email);


        }
        sendEmail(data);
    }
    catch (ex) {
        console.log('error in mail trigger', ex)

    }


    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  function sendEmail(data) {
    console.log('data data data', data)

      //const data = data.body

      // let recipient_email_multi = data.recipient_email.split(",");
      // recipient_email_multi.join(',')

      // using Twilio SendGrid's v3 Node.js Library
      // https://github.com/sendgrid/sendgrid-nodejs
      // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      // const msg = {
      // to: 'taylor.pasq@paseonforms.com', // TODO does this need to be changed to the fetched data?
      // from: 'taylorpasq@gmail.com',
      // subject: 'Hello Taylor',
      // text: 'PASSWORD REST LINK: www.google.com',
      // html: '<p>WHOA</p>'
      // };
      // sgMail.send(msg);
            

const msg = {
    to: data.recipient_email,
        from: data.from,
        subject: data.subject,
        text: 'and easy to do anywhere, even with Node.js',
};
  sgMail.send(msg);
  }



    // function sendEmail(data) {
    //     console.log('DATA === DATA ', data)
    //     //const data = data.body
    //     // let recipient_email_multi = data.recipient_email.split(",");
    //     // recipient_email_multi.join(',')

    //     // using Twilio SendGrid's v3 Node.js Library
    //     // https://github.com/sendgrid/sendgrid-nodejs
    //     // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    //     const msg = {
    //     to: data.recipient_email,
    //     from: data.from,
    //     subject: data.subject,
    //     text: 'and easy to do anywhere, even with Node.js',
    //     html: '<p>'+data.body+'</p>'
    //     };
    //     sgMail.send(msg);
    //     return res.sendStatus(200);
    // }

  

}
















































// var nodemailer = require('nodemailer');
// let Pxl = require('pxl')
 
// let pxl = new Pxl({
//     persistenceLayer: yourPersistenceLayer,
//     queryParam: 'pxl',
//     logPxlFailed(err, pxlCode, url) {}
// });

//Simple version, without validation or sanitation
// exports.test = function (req, res) {
//     res.send('Greetings from the Test controller!');
// };

// //READ ALL
// exports.landing = (req, res) => {
//     console.log('Hit Landing', req)
//     res.json({
   
//         msg: "Send Email Landing"
//     })
// }

// exports.sendEmail = (req, res) => {
//     console.log('SENDING...')
//     console.log('HIT THIS', )
//     var transporter = nodemailer.createTransport({
//         sendMail: true,
//         pooled: true,
//         service: 'gmail',
//         auth: {
//             user: 'taylorpasq@gmail.com',
//             pass: 'Sa!lfish'
//         }
//     });

//     var mailOptions = {
//         from: 'taylorpasq@gmail.com',
//         to: 'taylorpasq@gmail.com, sylvspasq@gmail.com',
//         subject: 'Sending Email From Purple Rabbit',
//         html: '<p>Hello</p><p>This is a test!</p>'
//     };

//     transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//             console.log(error);
//             res.send('Error')
//         } else {
//             console.log('Email sent: ' + info.response);
//             res.send('Successfully Sent')
//         }
//     });
    
// }


// exports.recieved_post = (req, res) => {
//     const data = req.body
//     console.log(req.body)
//     let err = res.error
//     if(res.error){
//         console.log('ERROR', err)
//         res.status(400).send({
//             message: 'This is an error!'
//          });
//     }else {
//         sendEmail(data).then( function() {
//                 res.status(200).send({
//                 message: 'Success!'
//             });
//         })
//     }   
// };

// const wait = time => new Promise((resolve) => setTimeout(resolve, time));

// wait(3000).then(() => console.log('Hello!')); // 'Hello!'

// // const wait = time => new Promise(
// //     res => setTimeout(() => res(), time)
// //   );

// var sendEmail = data => new Promise(function(resolve, reject) {//function (data) {
//     console.log(data)
//     var transporter = nodemailer.createTransport({
//         sendMail: true,
//         pooled: true,
//         service: 'gmail',
//         auth: {
//             user: 'taylorpasq@gmail.com',
//             pass: 'Sa!lfish'
//         }
//     });

//     var mailOptions = {
//         from: data.from,
//         to: data.recipient_email, // Needs to be user account information
//         subject: data.subject,
//         html: '<p>you have recieved the following inquiry from '+data.from+'</p> <p>'+data.body+'</p>'
//     };

//     transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//             console.log(error);
//             // res.send('Error')
//         } else {
//             resolve();
//             // console.log('Email sent: ' + info.response);
//             // resolve(res.send('Successfully Sent'))
//         }
//     });
  

// });

