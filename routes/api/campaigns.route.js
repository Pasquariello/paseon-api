const express = require('express');
const router = express.Router();
const app = express();
console.log('made it to campaign router dude')

const campaigns_controller = require('../../controllers/campaigns.controller.js');

router.post('/new_campaign/:id', campaigns_controller.newCampaign);
router.get('/get_campaigns/:id', campaigns_controller.getCampaigns);
router.get('/analytics/:id', campaigns_controller.getStatsAllCampaigns);
router.get('/get_campaign_details/:id', campaigns_controller.campaignDetails);
router.delete('/remove_campaign/', campaigns_controller.removeCampaign);

module.exports = router;
