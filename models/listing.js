const mongoose=require("mongoose");
const Review = require("./review.js");
const Schema=mongoose.Schema;

const listingSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
        type:Schema.Types.ObjectId,
        ref:"Review"
    }
],
    owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
    },
    geometry:{
        type:{
            type: String, // Don't do { location: {type: String } }` 
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates:{
            type:[Number],
            require:true
    }
    },
    // category:{
    //     type:String,
    //     enum:["mountains","arctic","farms","deserts"]
    // }
});


listingSchema.post("findOneAndDelete",async(listing)=>{
    await Review.deleteMany({reviews: {$in: listing.reviews}});
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;

