const router = require('express').Router();
const agenceDb = require('../db/agence.db');
const Agence = require('../models/agence');
const Controll = require('../controllers/AgenceController');

// localhost:3000/api/agence/generate
router.get('/generate', Controll.generateData);

// localhost:3000/api/agence/64c57f94d1d6db7ae0325383
router.get('/:id', Controll.getById);

// localhost:3000/api/agence/
router.get('/find/findAll', Controll.getAll);

// localhost:3000/api/agence/
router.post('/login/inscription', Controll.signup);

// localhost:3000/api/agence/
router.post('/login/seConnecter', Controll.login);

// localhost:3000/api/agence/
router.put('/mofidAgence', Controll.modifAgence);

// localhost:3000/api/agence/64c67e89651d776487275fe6
router.delete('/delete/:id', Controll.deleteAgence);

// localhost:3000/api/agence/64c57f94d1d6db7ae0325383/publication/64c57f94d1d6db7ae0325384
router.get('/:agenceId/publication/:publicationId', Controll.getPublicationById);

// localhost:3000/api/agence/64c57f94d1d6db7ae0325383/publication/64c57f94d1d6db7ae0325384
router.put('/:id/publication/:idPublication', Controll.updatePublication);

// localhost:3000/api/agence/64c57f94d1d6db7ae0325383/publication/64c57f94d1d6db7ae0325384
router.delete('/:id/publication/:idPublication', Controll.deletePublication);

// localhost:3000/api/agence/64c57f94d1d6db7ae0325383/publication
router.post('/:id/publication', Controll.insertPublication);

// localhost:3000/api/agence/64c57f94d1d6db7ae0325383/publication/64c57f94d1d6db7ae0325384/photo
router.post('/:id/publication/:idPublication/photo', Controll.addPhotoPublication);

// localhost:3000/api/agence/64c57f94d1d6db7ae0325383/publication/64c57f94d1d6db7ae0325385/photo/0 
router.delete('/:id/publication/:idPublication/photo/:photoIndex', Controll.deletePhotoPublication);

module.exports = router;