const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_url)
.then(() => {
    console.log('Connection has been established!')
}).catch(err => {
    console.log(err);
});


