var express = require('express');
var router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin, getUserById} = require("../controllers/user");
const {
    createQuiz, 
    getQuizById,
    getQuizByDifficultyLevel, 
    getResultByQuizId, 
    getAllQuizes
} = require("../controllers/quiz");

router.param("userId", getUserById);
router.param("quizId", getQuizById);
router.param("difficultyLevel",getQuizByDifficultyLevel)

//create quiz route
router.post("/quiz/create/:userId", isSignedIn, isAuthenticated, isAdmin, createQuiz);

//getting quiz by userId and DifficultyLevel
router.get("/quiz/:userId/:difficultyLevel", isSignedIn, isAuthenticated);

//getting the results of the quiz
router.post("/quiz/:userId/:quizId", isSignedIn, isAuthenticated, getResultByQuizId );


//getting all the quizes available in db
router.get("/quizes/:userId", isSignedIn, isAuthenticated, isAdmin, getAllQuizes)