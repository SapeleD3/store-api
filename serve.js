const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose')

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//import Routes
const userRoute = require('./routes/user')
const itemRoute = require('./routes/item')

//setup mongoose connection
mongoose.connect('mongodb+srv://aloneroland:coreldrawx3@cluster0-kfx0w.mongodb.net/store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MoongoDB Connected successfully'))
.catch(err => console.log(err))

//Routes
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api/user', userRoute)
app.use('/api/item', itemRoute)


const port = process.env.PORT || 3300
app.listen(port, () => console.log(`app listening on ${port} port!`))