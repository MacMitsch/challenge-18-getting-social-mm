const {Schema,model} =require("mongoose");

const UserSchema = new Schema(
    {
        username: {
            type:String,
            unique:true,
            trim:true,
            required:"Please enter a Username"
        },
        email:{
            type:String,
            unique:true,
            required:"Email is required",
            match:[/.+@.+\..+/],
        },
        thoughts:{
                type:Schema.Types.ObjectId,
                ref:"Thought",
            },
        
        friends:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
    },
    {
    toJSON:{
        virtuals:true,
    },
    id:false,
}
);
UserSchema.virtual("friends").get(function(){
    return this.friends.length;

});

const User = model("User", UserSchema);
module.exports = User;