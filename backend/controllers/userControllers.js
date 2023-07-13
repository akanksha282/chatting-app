const asyncHandler=require('express-async-handler');
const User= require('../models/userModel');
const generateToken= require('../config/generateToken');



const registerUser =asyncHandler(async(req,res)=>{
    const {name ,email,password ,pic}=req.body;

    if(!name || !email || !password)
    {
        res.status(400);
        throw new Error('Please Enter all the Fields')
    }

    const userExists =await User.findOne({email:email});

    if(userExists)
    {
        res.status(400);
        throw new Error('user already exist');
    }

    const user =User({
        name,
        email,
        password,
        pic,

    });
    // change
     await user.save()
    if(user)
{
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        password:user.password,
        pic:user.pic,
        token:generateToken(user._id)
    });

}
else{
    res.status(400);
    throw new Error("Failed to create new user")
}

});

const authUser =asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    const user =await User.findOne({email:email});

    if(user && (await user.matchPassword(password)))
    {
        res.json({
             _id:user._id,
        name:user.name,
        email:user.email,
        password:user.password,
        pic:user.pic,
        token:generateToken(user._id)
        })
    }
    else{
    res.status(400);
    throw new Error("Invalid id or password")
}

});
// /api/user?search=Raj
const allUsers= asyncHandler(async (req,res)=>{
    const keyword=req.query.search?{
        $or:[
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}},
        ],
    }
    :{}
    // change from find
    const users =await User.find(keyword).find({_id: {$ne: req.user._id}});
    res.send(users)

   
})



module.exports={registerUser ,authUser,allUsers };
