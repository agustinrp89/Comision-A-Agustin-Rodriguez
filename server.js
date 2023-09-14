require('dotenv').config()
const express = require ('express');
const cors = require ('cors');
const Sequelize = require('sequelize');
const { Post } = require('./models/postModel');
const { getAllposts } = require('./controllers/postsCont');

const app= express()

var corOptions = {
    origin : 'https://localhost:3307'
}


//middleware
app.use(cors(corOptions))

app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use('/public', express.static('public'));


//routers

const router = require ('./routes/routes',)
app.use ('/api/posts', router)


// testing api
app.set ('view engine','ejs');

app.get('/', function (req,res)  {
    res.render('admin',{})
})

//port
const PORT = process.env.PORT || 3307


//server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});