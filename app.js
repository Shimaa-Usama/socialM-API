const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(require('./routes/app.routes'));


mongoose.connect('mongodb+srv://admin:admin@shu.j3esi.mongodb.net/SocialMProjectAPI', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.listen(process.env.PORT|| port, () => console.log(`Example app listening on port port!`))