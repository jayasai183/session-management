const mongoose=require('mongoose');
const {Schema}=mongoose;

const user=new Schema({
    Username:String,
    Password:String
})

module.exports=mongoose.model("user",user);