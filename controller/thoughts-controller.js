const {Thoughts, User} = require('../models');

const thoughtsController = {
    getAllThoughts (req, res){
        Thoughts.find({})
        .populate({
            path:'reactions',
            select:'-__v',
        })
        .select('-__v')
        .sort({_id:-1})
        .then((thoughtsData) => res.json(thoughtsData))
        .catch((err)=>{
            console.log(err);
            res.sendStatus(400);
        }); 
    },
    // get the Thought Id
    getThoughtsId({params}, res) {
        Thoughts.findOne({_id: params.id})
        .populate({
            path: 'reactions',
            select:'-__v',
        })
        .select ('-__v')
        .then((thoughtsData) => {
            if(!thoughtsData) {
                return res.status(404).json({message:"No thought is associated with this Id number, Please try again."})
            }
            res.json(thoughtsData);
        })
        .catch((err)=>{
            console.log(err);
            res.sendStatus(400);
        });
    },
    // Generating thought 
    createNewThought ({params,body},res){
        Thoughts.create(body)
        .then(({_id})=>{
            return User.findOneAndUpdate(
                {_id: body.userId},
                {$push: {thoughts:_id}},
                {new:true}
            );
        })
        .then((userData)=>{
            if(!userData) {
                return res
                .status(404)
                .json({message:"Your thought has been created, but is not associated with a user id."});
            }
            res.json({message:"Your thought has been successfully created"});
        })
        .catch((err) => res.json(err));
    },
    // Update
    updateThoughts ({params,body},res){
        Thoughts.findOneAndUpdate({_id:params.id},body,{
            new:true,
            runValidators: true,
        })
        .then((thoughtsData) => {
            if (thoughtsData) {
                res.status(404).json({message:"We couldn't find a thought associated with this id."});
                return;
            }
            res.json(thoughtsData);
        })
        .catch((err) => res.json(err));
    },
    // Delete
    deleteThoughts({params},res){
        Thoughts.findOneAndDelete({_id: params.id})
        .then((thoughtsData) => {
            if(!thoughtsData) {
                return res.status(404).json({ message:"There is no thought with this id."});
            }
            // remove id from thoughts field
            return User.findOneAndUpdate(
                {thoughts:params.id},
                {$pull:{thpights:params.id}},
                {new:true}
            );
        })
        .then((userData)=> {
            if(!userData) {
                return res
                .status(404)
                .json({ message: "your thought has been created, But is not associated with a id."})
            }
            res.json({ message:"your thought has successfully been deleted."});
        })
        .catch((err) => res.json(err))
    },
    // REACTIONS
    //  Add reactions
    addReaction({params,body},res){
        Thoughts.findOneAndUpdate(
            {_id:params.thoughtsId},
            {$addToSet: {reactions:body}},
            {new:true, runValidators:true}
        )
        .then((thoughtsData)=>{
            if(!thoughtsData) {
                res.status(404).json({ message:"There's no thought associated with this Id."});
                return;
            }
            res.json(thoughtsData);
        })
        .catch((err) => res.json(err));
    },
    // Delete reactions
    deleteReaction({params},res){
        Thoughts.findOneAndUpdate(
            {_id: params.thoughtsId},
            {$pull: {reactions:{reactionsId: params.reactionsId}}},
            {new:true}
        )
        .then(thoughtsData => res.json(thoughtsData))
        .catch((err)=> res.json(err));
    },
};
module.exports = thoughtsController