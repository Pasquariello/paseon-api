const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');


const app = express();
//Body Parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// app.use('*', cors({credentials: true, origin:true}))

// app.use(cors({credentials: true, origin: 'http://127.0.0.1:8081'}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cors({credentials: true, origin: 'https://paseon.taylorpasq.now.sh'}));





const sendEmail = require('./routes/api/sendEmail.route.js'); // Imports routes for the sendEmail
const auth = require('./routes/api/auth.route.js'); // Imports routes for the auth
const campaigns = require('./routes/api/campaigns.route.js'); // Imports routes for the campaigns



//dont need any more but hold for now
app.get('/', (req, res) => res.send('Entry Point'))



//Use Routes
app.use('/emailService', sendEmail);
app.use('/login', auth);
app.use('/campaign', campaigns);


const port = process.env.PORT || 3001;

app.listen(port, () => {

    console.log(`Server is up and running on port: ${port}`);
});
