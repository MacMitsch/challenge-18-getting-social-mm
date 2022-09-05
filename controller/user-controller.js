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
        .then((UserData) => res.json(userData))
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
    }
}