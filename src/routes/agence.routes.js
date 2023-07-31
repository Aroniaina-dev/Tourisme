const router = require('express').Router();
const agenceDb = require('../db/agence.db');
const Agence = require('../models/agence');


// localhost:3000/api/agence/generate
router.get('/generate', async (req, res) => {
    try {
        console.log('generate Agence')
        const result = await Agence.insertMany(agenceDb)
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

// CRUD AGENCE

// localhost:3000/api/agence/64c57f94d1d6db7ae0325383
router.get('/:id', async (req, res) => {
    try {
        const filter = {}
        if (req.params.id) filter._id = req.params.id
        else {
            res.status(400).json({ msg: 'ID required' })
            return
        }
        const result = await Agence.findOne(filter)
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

// localhost:3000/api/agence/
router.get('/', async (req, res) => {
    try {
        console.log('get All Agence')
        const filter = {}
        if (req.query.id) filter._id = req.query.id
        const result = await Agence.find(filter, null, { sort: { updatedAt: 1 } })
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

// localhost:3000/api/agence/
router.post('/', async (req, res) => {
    try {
        console.log('save Agence', req.body)
        let agence = new Agence(req.body)
        agence = await agence.save()
        res.json(agence)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

// localhost:3000/api/agence/
router.put('/', async (req, res) => {
    try {
        const data = req.body
        console.log("Update Agence: ", data);
        const filter = {}
        if (data._id) filter._id = data._id
        else {
            res.status(404).json({ success: false, msg: "ID required" })
            return
        }
        const agence = await Agence.findOneAndUpdate(filter, data)
        res.json(agence)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

// localhost:3000/api/agence/64c67e89651d776487275fe6
router.delete('/:id', async (req, res) => {
    try {
        const filter = {}
        if (req.params.id) filter._id = req.params.id
        else {
            res.status(400).json({ msg: 'ID required' })
            return
        }
        const result = await Agence.deleteOne(filter)
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

// localhost:3000/api/agence/64c57f94d1d6db7ae0325383/publication/64c57f94d1d6db7ae0325384
router.get('/:agenceId/publication/:publicationId', async (req, res) => {
    try {
        const { agenceId, publicationId } = req.params;
        if (!agenceId || !publicationId) {
            res.status(400).json({ msg: 'Agence ID and Publication ID are required' });
            return;
        }
        const agence = await Agence.findOne({ _id: agenceId });
        if (!agence) {
            res.status(404).json({ msg: 'Agence not found' });
            return;
        }
        const publication = agence.publication.find(pub => pub._id.toString() === publicationId);
        if (!publication) {
            res.status(404).json({ msg: 'Publication not found' });
            return;
        }
        res.json(publication);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// localhost:3000/api/agence/64c57f94d1d6db7ae0325383/publication/64c57f94d1d6db7ae0325384
router.put('/:id/publication/:idPublication', async (req, res) => {
    try {
        const { id, idPublication } = req.params;
        const data = req.body;
        if (!id || !idPublication) {
            res.status(400).json({ msg: 'Agence ID and Publication ID are required' });
            return;
        }
        const agence = await Agence.findOne({ _id: id });
        if (!agence) {
            res.status(404).json({ msg: 'Agence not found' });
            return;
        }
        const publication = agence.publication.find(pub => pub._id.toString() === idPublication);
        if (!publication) {
            res.status(404).json({ msg: 'Publication not found' });
            return;
        }
        Object.assign(publication, data);
        await agence.save();
        res.json(publication);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// localhost:3000/api/agence/64c57f94d1d6db7ae0325383/publication/64c57f94d1d6db7ae0325384
router.delete('/:id/publication/:idPublication', async (req, res) => {
    try {
        const { id, idPublication } = req.params;
        if (!id || !idPublication) {
            res.status(400).json({ msg: 'Agence ID and Publication ID are required' });
            return;
        }
        const agence = await Agence.findOne({ _id: id });
        if (!agence) {
            res.status(404).json({ msg: 'Agence not found' });
            return;
        }
        const publicationIndex = agence.publication.findIndex(pub => pub._id.toString() === idPublication);
        if (publicationIndex === -1) {
            res.status(404).json({ msg: 'Publication not found' });
            return;
        }
        agence.publication.splice(publicationIndex, 1);
        await agence.save();
        res.json({ msg: 'Publication deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// localhost:3000/api/agence/64c57f94d1d6db7ae0325383/publication
router.post('/:id/publication', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!id) {
            res.status(400).json({ msg: 'Agence ID is required' });
            return;
        }
        const agence = await Agence.findOne({ _id: id });
        if (!agence) {
            res.status(404).json({ msg: 'Agence not found' });
            return;
        }
        agence.publication.push(data);
        await agence.save();
        res.json({ msg: 'Publication added successfully', publication: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// localhost:3000/api/agence/64c57f94d1d6db7ae0325383/publication/64c57f94d1d6db7ae0325384/photo
router.post('/:id/publication/:idPublication/photo', async (req, res) => {
    try {
        const { id, idPublication } = req.params;
        const { photoUrl } = req.body;
        if (!id || !idPublication || !photoUrl) {
            res.status(400).json({ msg: 'Agence ID, Publication ID, and Photo URL are required' });
            return;
        }
        const agence = await Agence.findOne({ _id: id });
        if (!agence) {
            res.status(404).json({ msg: 'Agence not found' });
            return;
        }
        const publication = agence.publication.find(pub => pub._id.toString() === idPublication);
        if (!publication) {
            res.status(404).json({ msg: 'Publication not found' });
            return;
        }
        publication.photo.push(photoUrl);
        await agence.save();
        res.json({ msg: 'Photo added successfully', photoUrl });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// localhost:3000/api/agence/64c57f94d1d6db7ae0325383/publication/64c57f94d1d6db7ae0325385/photo/0
router.delete('/:id/publication/:idPublication/photo/:photoIndex', async (req, res) => {
    try {
        const { id, idPublication, photoIndex } = req.params;
        if (!id || !idPublication || !photoIndex) {
            res.status(400).json({ msg: 'Agence ID, Publication ID, and Photo Index are required' });
            return;
        }
        const agence = await Agence.findOne({ _id: id });
        if (!agence) {
            res.status(404).json({ msg: 'Agence not found' });
            return;
        }
        const publication = agence.publication.find(pub => pub._id.toString() === idPublication);
        if (!publication) {
            res.status(404).json({ msg: 'Publication not found' });
            return;
        }
        if (photoIndex < 0 || photoIndex >= publication.photo.length) {
            res.status(400).json({ msg: 'Invalid Photo Index' });
            return;
        }
        publication.photo.splice(photoIndex, 1);
        await agence.save();
        res.json({ msg: 'Photo deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;