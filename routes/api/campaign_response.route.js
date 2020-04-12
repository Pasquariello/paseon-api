const express = require('express');
const router = express.Router();
const app = express();
console.log('made it to campaign_response router')

const campaigns_response_controller = require('../../controllers/campaign_response.controller.js');

router.post('/:id', campaigns_response_controller.new_response);


module.exports = router;
