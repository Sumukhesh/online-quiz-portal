var express = require('express');
var router = express.Router()
const {check, validationResult} = require('express-validator');


const {
    signout, 
    signup, 
    signin, 
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getPrevResultsById,
    getUserById
} = require("../controllers/user");

router.param("userId", getUserById);

//Signout route
router.get("/signout", signout)

//Signup route 
router.post("/signup", 
[
    check("name","Name should be more than 3 letter").isLength({min: 3}),
    check("email","Email is required").isEmail(),
    check("password","Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,)
], signup);


//signin route
router.post("/signin",[
    check("email","email is required").isEmail(),
    check("password", "Password is Required").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,)
], signin);

//getting previous results of the user by userId
router.get("/results/:userId", isSignedIn, isAuthenticated, getPrevResultsById)



module.exports = router;