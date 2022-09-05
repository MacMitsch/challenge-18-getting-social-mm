const { Thoughts, User} = require("../models");

const userController = {
    getAllUsers(req,res) {
        User.find({})
        .populate({
            path:"friends",
            select:"-__v",
        })
        .select(-__v)
        .sort({_id:-1})
        .then((userData) => res.json(userData))
        .catch((err)=> {
            console.log(err);
            res.sendStatus(404);
        });
    },
    getUserId({ params},res) {
        User.findOne({_id:params.id})
        .populate({
            path:"thoughts",
            select:"-__v"
        })
        .select("-__v")
        .then((userData)=> {
            if (!userData) {
                return res
                .status(404)
                .json({message: "There was no user found with this Id."});
            }
            res.json(userData);
        })
        .catch((err)=> {
            console.log(err);
            res.sendStatus(404);
        });
    },
    // Creating a new User ID
    createUser({body},res){
        User.create(body)
        .then((userData)=> res.json(userData))
        .catch((err) => res.json(err));
    },
    // Update a User
    updateUser({params,body},res){
        User.findOneAndUpdate({_id:params.id},body,{
            new:true,
            runValidators:true
        })
        .then((userData)=>{
            if(!userData) {
                res.status(404).json({ message: "We couldn't find any user with that Id."});
                return;
            }
            res.json(userData);
        })
        .catch((err)=> res.json(err));
    },
    // Deleting a User
    deleteUser({params},res){
        User.findOneAndDelete({_id: params.id})
        .then((userData)=>{
            if (!userData) {
                return res.status(404).json({message:"There is no user with that Id."});
            }
            return Thoughts.deleteMany({_id: {$in: userData.Thoughts}});
        })
        .then(()=>{
            res.json({message:"the User and all thoughts by this user were deleted!"});
        })
        .catch((err)=>res.json(err));
    },
    // Adding a fellow User
    addUser({params},res){
        User.findOneAndUpdate(
            {_id:params.userId},
            {$addToSet:{friends:params.friendId}},
            {new:true, runValidators:true}
        )
        .then((userData)=> {
            if(userData) {
                res.status(404).json({ message:"Sorry there is no user with that Id, Please try again."});
                return;
            }
            res.json(userData);
        })
        .catch((err)=>res.json(err));
    },
    // Delete a fellow User
    removeUser({params},res){
        User.findOneAndUpdate(
            {_id:params.userId},
            {$pull:{friends:params.friendId}},
            {new:true}
        )
        .then((userData)=>{
            if(!userData){
                return res.status(404).json({message:"there's no user with this Id."});
            }
            res.json(userData);
        })
        .catch((err)=>res.json(err));
    }
};
module.exports = userController