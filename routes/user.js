const express=require("express");
const router=express.Router();
const User=require("../models/user.js");  //Requiring Schema
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");   //What is this in curly braces{ }?  //Middleware Function as told by Black Box
const userController=require("../controllers/users.js");

router
.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));


router
.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl
    ,passport.authenticate("local",{   //passport is used to check whether the username or password is correct or not //Also it will flash error message!!
        failureRedirect: '/login',
        failureFlash:true}) ,
        userController.login
);


router.get("/logout",userController.logout);


module.exports=router;