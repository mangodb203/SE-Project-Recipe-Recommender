const express = require("express");
const { getRecommendation } = require("../controllers/recommend");
const router = express.Router();

router.post('/', getRecommendation);

module.exports = router;
