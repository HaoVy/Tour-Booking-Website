const{mutipleMongooseToObject} = require('../../util/mongoose');
const User= require("../models/User");

const userController={
    index(req, res, next){

        let userQuery = User.find()

        if (req.query.hasOwnProperty('_sort')) {
            userQuery = userQuery.sort({
                [req.query.column]: req.query.type
            });
        }

        userQuery
            .then(user => {
                res.render('user/index', {user: mutipleMongooseToObject(user)});
            })
            .catch(next)
    },

    // deleteuser: async(req,res)=>{
    //     try{
    //         const useradmin = await User.findById(req.params.id1);
    //         if(useradmin.admin){
    //             const user=await User.findByIdAndDelete(req.params.id2);
    //             res.status(200).json(user);
                
    //         }
    //         else{
    //             req.status(403).json('you are to delete');
    //         }
    //         const user=await User.findById(req.params.id);
    //         res.status(200).json("delete good")
            
    //     }catch(err){
    //         res.status(500).json(err);
    //     }
    // }

    deleteuser(req, res, next) {
        User.deleteOne({ _id: req.params.id })
          .then(() => res.redirect('back'))
          .catch(next);
    }
    // getAllUsers: async(req,res)=>{
        
    //     try{
    //         // const danglogin = await User.findOne({token: {$ne: "Log out"}})
    //         // console.log(danglogin);
    //         // if(danglogin){
    //             const user=await User.find();
    //             res.status(200).json(user);
    //         // }
                
    //         // else{
    //         //     res.json(err)
    //         // }
    //     }catch(err){
    //         res.status(500).json(err);
    //     }
    // },

    // deleteuser: async(req,res)=>{
    //     try{
    //         // const useradmin = await User.findById(req.params.id1);
    //         // if(useradmin.admin){
    //             // const user=await User.findByIdAndDelete(req.params.id2);
    //             // res.status(200).json(user);
                
    //         //}            // else{
    //         //     req.status(403).json('you are to delete');
    //         // }
    //         const user=await User.findById(req.params.id);
    //         res.status(200).json("delete good")
            
    //     }catch(err){
    //         res.status(500).json(err);
    //     }
    // }
}

module.exports=userController;