const express = require('express');
const router = express.Router();
const app = express();
console.log('made it to auth router')

const auth_controller = require('../../controllers/auth.controller');

router.post('/auth', auth_controller.userAuth);

module.exports = router;
