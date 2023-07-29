const router = require('express').Router();
const agenceDb = require('../db/agence.db');
const Agence = require('../models/agence');


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


router.post('/', async (req, res) => {
    try {
        console.log('save Agence', req.body)
        let agence = new Agence(req.body)
        agence = await agence.save()
        console.log('new', agence)
        res.json(agence)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

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

module.exports = router;