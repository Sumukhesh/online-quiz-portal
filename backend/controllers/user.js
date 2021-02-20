const User = require('../models/user');
const {validationResult, check} = require('express-validator');
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

//Signup controller
exports.signup = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: [errors.array()[0].msg],
        })
    }

    const user =new User(req.body);
    user.save((err,user) => {
        //TO check if user is saved, 
        //Must be removed later
        console.log(user);
        if(err || !user){
            return res.status(400).json({
                error: "Unable to Save user into Database"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    });
};

//Signin Controller
exports.sigin = (req, res) => {
    const errors = validationResult(req);
    const {email, password} = req.body;

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: [errors.array()[0].param, errors.array()[0].msg],
        });
    }

    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User doesn't exist",
            });
        }

        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password combination doesn't match",
            });
        }

        //creating a JWT token
        const token = jwt.sign({_id: user._id}, process.env.SECRET);
        //Putting token into Cookie
        res.cookie("token", token ,{expire: new Date() + 9999});
        //sending response object to front-end
        const{_id,name,email,role} = user;
        return res.json({token, user: {_id, name, email, role}});

    });
};


//signout controller
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        Message: "User signed out",
    });
};

//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
})

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED",
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0) {
        return res.status(402).json({
            error: "You are not an Admin, ACCESS DENIED",
        });
    }
    next();
};

//Controller for getting a user details by id
exports.getUserById = (req, res, id, next) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(401).json({
                error: "No user found in db, by given id"
            })
        }
        req.profile = user
        next();
    })
}

//Controller for getting user's prev quiz results
exports.getPrevResultsById = (req, res) => {
    User.findById(req.profile._id)
    .exec((err, user) => {
        if(err || !user){
            return res.status(401).json({
                error: "No user found in db, by given id"
            });
        };
        let prev_quiz_results = user.prev_quiz_results;
        return res.json(prev_quiz_results);
    })
}

