var express = require('express');
var router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin, getUserById} = require("../controllers/user");
const {
    createQuiz, 
    getQuizById,
    getQuizByDifficultyLevel, 
    getResultByQuizId, 
    getPrevResultsByUserId
} = require("../controllers/user");

router.param("userId", getUserById);
router.param("quizId", getQuizById);

//create quiz route
router.post("/quiz/create/:userId", isSignedIn, isAuthenticated, isAdmin, createQuiz);

//getting quiz by userId and DifficultyLevel
router.get("/quiz/:userId", isSignedIn, isAuthenticated, getQuizByDifficultyLevel);

//getting the results of the quiz
router.post("/quiz/:userId/:quizId", isSignedIn, isAuthenticated, getResultByQuizId );

//getting previous results of the user by userId
router.get("/quiz/:userId", isSignedIn, isAuthenticated, getPrevResultsByUserId)


