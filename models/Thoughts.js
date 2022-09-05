const {Schema,types,model} = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const reactionScema = new Schema(
    {
     reactionId:
    {
        type:Schema.Types.ObjectId,
        default:()=>new Types.ObjectId(),
    },
    reactionBody: 
    {
        type:String,
        required: true,
        maxlength:280,
    },
    username:
    {
        type:String,
        required:true,
    },
    createdAt:
    {
        type:Date,
        default:Date.now,
        get:(timestamp) => dateFormat(timestamp),
    },
},
{toJSON:{
    getters:true
},
id:false
}
);
const ThoughtSchema = new Schema(
    {
     thoughtText:{
        type:String,
        required:"What are your Thoughts?",
        minlength:1,
        maxlength:280,
     },
     createAt: {
        type:Date,
        default:Date.now,
        get:(timestamp) => dateFormat(timestamp),
     },
     username: {
        type:String,
        required:true
     },
     reactions: [ReactionSchema],
    },
    {
        toJSON:{
            virtuals:true,
            getters:true
        }, 
        id:false
    }
);
ThoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
});
const Thought = model("Thought",ThoughtSchema);
module.exports = Thought