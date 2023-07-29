const express = require('express');
const router = express();
const path = require('path');
const agenceRouter = require('./src/routes/agence.routes');
router.use('/agence', agenceRouter);

module.exports = router;