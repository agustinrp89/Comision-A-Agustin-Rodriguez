const db = require('../models');

const Post = db.posts

// create post

const addpost = async (req,res) => {
    let info = {
        titulo: req.body.titulo,
        contenido:req.body.contenido,
        imagen:req.body.imagen,
        link:req.body.link,
        dia:req.body.dia
    }

    const post = await Post.create(info)
    res.status(200).send(post)
    console.log(post)
}

//get all posts

const getAllposts = async (req,res) => {   
    let post = await Post.findAll({})
    res.status(200).send(post)
}


//get single posts

const getpostById = async (req,res) => {

    let id = req.params.id
    let post = await Post.findOne({where : {id : id}})
    res.status(200).send(post)
}

//update single posts

const updatepostById = async (req,res) => {

    let id = req.params.id

    const post = await Post.update(req.body, {where : {id : id}})
    res.status(200).send(post)
}

//delete psot

const deletepostById = async (req,res) => {

    let id = req.params.id

  await Post.destroy({where : {id : id}})
    res.status(200).send('post deleted')
}



  

module.exports = {

    getAllposts,
  getpostById,
  addpost,
  updatepostById,
  deletepostById,
  
}