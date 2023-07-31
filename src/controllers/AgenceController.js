const agenceDb = require('../db/agence.db');
const Agence = require('../models/agence');

exports.login = (req, res, next) => {
    Agence.findOne({ email: {$eq:req.body.email} })
      .then(user => {
          if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
          bcrypt.compare(req.body.password, user.password)
              .then(valid => {
                  if (!valid) {
                      return res.status(401).json({ error: 'Mot de passe incorrect !' });
                  }
                  console.log("mety");
                  res.status(200).json({
                      userId: user._id,
                      token: jwt.sign(
                          { userId: user._id },
                          'RANDOM_TOKEN_SECRET',
                          { expiresIn: '24h' }
                      )
                  });
              })
              .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

exports.generateData = async (req, res, next) =>{
    try {
        console.log('generate Agence')
        const result = await Agence.insertMany(agenceDb)
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
}

exports.getById = async (req, res, next) =>{
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
}

exports.getAll = async (req, res, next) =>{
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
}

exports.signup = (req, res, next) => {
 
    let Agences = new Agence(req.body)
        Agence.save((err,doc)=>{
         if (!err){
             console.log("atoo");
             res.send(doc);
         }
     else {
         if (err.code == 11000)
             res.status(422).send(['Duplicate email adrress found.']);
         else
             return next(err);
     }
         // .then(Userclients => {res.json({ message: 'Compte créé !' })})
         // .catch(error => {res.json({ message : error.message })});
 })
 }
 

// exports.insertAgence = async (req, res, next) =>{
//     try {
//         console.log('save Agence', req.body)
//         let agence = new Agence(req.body)
//         agence = await agence.save()
//         res.json(agence)
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ msg: error })
//     }
// }

exports.modifAgence = async (req, res, next) =>{
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
}

exports.deleteAgence = async (req, res, next) =>{
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
}

exports.getPublicationById = async (req, res, next) =>{
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
}

exports.updatePublication = async (req, res, next) =>{
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
}

exports.deletePublication = async (req, res, next) =>{
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
}

exports.insertPublication = async (req, res, next) =>{
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
}

exports.addPhotoPublication = async (req, res, next) =>{
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
}

exports.deletePhotoPublication = async (req, res, next) =>{
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
}