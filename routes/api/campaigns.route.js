const express = require('express');
const router = express.Router();
const app = express();
console.log('made it to campaign router')

const campaigns_controller = require('../../controllers/campaigns.controller.js');

router.post('/new_campaign', campaigns_controller.newCampaign);

module.exports = router;
