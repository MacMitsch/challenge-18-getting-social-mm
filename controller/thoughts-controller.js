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
    updateThoughts
}