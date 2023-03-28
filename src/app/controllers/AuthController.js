const User= require("../models/User");
const jwt= require("jsonwebtoken");
const bcrypt = require("bcrypt");
const middle = require('./MiddlewareController');
const { mongooseToObject} = require('../../util/mongoose');

const authController={
    //REGINTER
    registerUser: async(req,res)=>{
        try{
            const salt= await bcrypt.genSalt(10);
            const hashed=await bcrypt.hash(req.body.password, salt);

            //create new user
            const newUser=await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
                fullname: req.body.fullname,
                address: req.body.address,
                phone: req.body.phone,
                token: 'logout',
            });

            //seve to data
              const user= await newUser.save();
        //     try{
        //         const cart = await Cart.create({id_account: user._id})
        //     }catch(err){
        //     res.status(500).json(err);
        // }
            //res.status(200).json(user)
            res.render('dangkythanhcong');
        }catch(err){
            res.status(500).json(err);
        }
    },

        //login user
    loginUser: async(req,res, next)=>{
        try{
            const user = await User.findOne({username: req.body.username});
            if(!user){
                return res.status(404).json("Wrong username!");   
            }
            const validPassword= await bcrypt.compare(                
                req.body.password,
                user.password
            );
            if(!validPassword){
                return res.status(404).json("Wrong password");
            }
            if(user && validPassword){
                const token=jwt.sign({
                    id: user._id,
                    admin: user.admin,
                    username: user.username
                }, 'secret', 
                {expiresIn: '2000s'}
                );
                
                res.cookie("acessToken",token,{
                    httpOnly: true,
                })
                User.findOneAndUpdate({_id: user._id}, {token: token}, {new: true})
                    .then(function(){
                        
                        //res.render('trangcanhan');
                    })
                    .catch(err =>
                        console.log(err)
                    )
                User.findOne({token: {$ne: "logout"}})
                    .then(user => {
                        res.render('trangcanhan', {
                            user:mongooseToObject(user)
                        })
                    })
                    .catch(err => console.log(err));
                // res.status(200).json(user.username);    
                // res.status(200).json({user,token});
                res.render('trangcanhan',{user:mongooseToObject(user)});
                
            }

        }catch(err){
            res.status(500).json(err);
        }
    },

    logout: async(req,res)=>{
        res.clearCookie('acessToken');
        // acessTokens=acessTokens.filter(
        //     (token)=>token!==req.cookies.acessToken
        // );
        // res.status(200).json("Log out !");
        res.render('logoutmess');
        // User.findOneAndUpdate({token: {$ne: "logout"}}, {token: "logout"}, {new: true})
        //             .then(function(){
        //                 res.render('trangcanhan');
        //             })
        //             .catch(next)
    },


    showlogin: async(req,res)=>{
        try{
           //res.json(user);
            res.render('login');

        }catch(err){
            res.status(500).json(err);
        }
    },

    showlogout: async(req,res)=>{
        try{
           //res.json(user);
            res.render('logout');

        }catch(err){
            res.status(500).json(err);
        }
    },

    showregister: async(req,res)=>{
        try{
           res.render('user');

        }catch(err){
            res.status(500).json(err);
        }
    }

}
module.exports=authController;