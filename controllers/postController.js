const Post = require('../models/postModel');



exports.getAllPosts = async (req, res, next) =>{

    try{

        const posts = await Post.find();

        res.status(200).json({ 
            status:"success",
            results:posts.length,
            data:{
                posts
            }
        })
    }
    catch(err){
        console.log(err);
      res.status(400).json({
          status:"fail",
          msg:"Something went wrong"
      })
    }

}

exports.getOnePost = async (req, res, next) =>{

    try{

        const post = await Post.findById(req.params.id);

        res.status(200).json({ 
            status:"success",
            data:{
                post
            }
        })
    }
    catch(err){
        console.log(err);

      res.status(400).json({
          status:"fail",
          msg:"Something went wrong"
      })
    }

}

exports.createPost = async (req, res, next) =>{

    try{

        const post = await Post.create(req.body);

        res.status(200).json({ 
            status:"success",
            data:{
                post
            },
            msg:"post has been create successfully"
        })
    }
    catch(err){
        console.log(err);
      res.status(400).json({
          status:"fail",
          msg:"Something went wrong"
      })
    }

}

exports.updatePost = async (req, res, next) =>{

    try{

        const post = await Post.findByIdAndUpdate(req.params.id,req.body ,{
            new: true,
            runValidators:true
        });

        res.status(200).json({ 
            status:"success",
            data:{
                post
            },
            msg:"post has been updated successfully"
        })
    }
    catch(err){
        console.log(err);
      res.status(400).json({
          status:"fail",
          msg:"Something went wrong"
      })
    }

}



exports.deletePost = async (req, res, next) =>{

    try{

        const post = await Post.findByIdAndRemove(req.params.id);

        res.status(200).json({ 
            status:"success",
            msg:"post has been deleted successfully"
        })
    }
    catch(err){
      console.log(err);
      res.status(400).json({
          status:"fail",
          msg:"Something went wrong"
      })
    }

}