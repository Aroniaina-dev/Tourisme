const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tourisme:tourismeapk@tourisme.ybqzdfy.mongodb.net/', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'), console.log(process.env.DB_LINK))
    .catch(err => console.log(err));