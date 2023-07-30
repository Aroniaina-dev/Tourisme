const express = require('express');
const router = express.Router();

const agenceCtrl = require('../controllers/agenceController');
router.post('/signup', agenceCtrl.signup);
router.post('/login', agenceCtrl.login);

router.post('/add', agenceCtrl.AjoutClient);
router.get('/custumer', agenceCtrl.getAllUser);
router.get('/custumer/:id', agenceCtrl.getOneUser);
router.put('/update-custumer/:id', agenceCtrl.UpdateClient);
router.delete('/delete/:id', agenceCtrl.DeleteClient);
module.exports = router;