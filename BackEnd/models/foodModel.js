import mongoose from 'mongoose'

const foodSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true},
})

/*schema:name of keys and type of values.
we are not providing value here directly else it will a simple manually written object */

const foodModel= mongoose.models.food || mongoose.model("food",foodSchema)

export default foodModel