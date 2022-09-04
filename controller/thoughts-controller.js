const {Thoughts, User} = require('../models');

const thoughtsController = {
    getAllThoughts (req, res){
        Thoughts.find({})
        .populate({
            path:'reactions',
            select:'-__v',
        })
    }
}