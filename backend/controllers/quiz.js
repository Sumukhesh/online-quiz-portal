const User = require("../models/user");
const Quiz = require("../models/quiz");
const formidable = require("formidable");
const fs = require('fs');
const user = require("../models/user");
const quiz = require("../models/quiz");
const { profile } = require("console");



//Param to populate the quiz obj in request
exports.getQuizById = (req, res, next, id) => {
    Quiz.findById(id)
    .exec((err, quiz) => {
        if(err || !quiz){
            return res.status(400).json({
                error: "Cant find the quiz in the DB"
            })
        }
        req.quiz = quiz;
        next();
    })
};

//Param to get quiz by difficulty level given from req obj
exports.getQuizByDifficultyLevel = (req, res, next, difficultyLevel) => {
    Quiz.findOne({difficulty_level: difficultyLevel})
    .exec((err,quiz) => {
        if(err || !quiz){
            return res.status(400).json({
                error: "Cant find the quiz with the given difficulty level"
            })
        }
        req.quiz = quiz;
        console.log(req.quiz);
        res.json({
            quiz_id: quiz._id,
            difficulty_level: quiz.difficulty_level,
            quiz_questions: quiz.quiz_questions,
        });
        next();
    })
};

//Controller to calculate the result of the quiz
exports.getResultByQuizId = (req,res) => {
    var key = req.quiz.quiz_key;
var userResponses = req.body.user_responses
if(!userResponses || !req){
    return res.status(400).json({
        error: "User responses not found"
    });
};

var result = (arr1, arr2) => {
    const result = [];
    for(let i = 0; i<arr1.length; i++){
      if(arr1[i] === arr2[i]){
        result.push(arr1[i]);
      }
    }
    return result.length; 
  }
    var finalResult = result(userResponses, key); 
    req.profile.prev_quiz_results.push(finalResult);
    User.findById(req.profile._id)
    .exec((err, user) => {
        user.prev_quiz_results.push(finalResult);
        user.save();
    })
    console.log(req.profile.prev_quiz_results);

    res.json(finalResult);
};

//controller to create quiz
exports.createQuiz = (req, res) => {
    if(!req.body){
        return res.status(400).json({
            error: "Request body object not readable"
        });
    }
    
    let quiz = new Quiz(req.body);
    quiz.save();
    console.log("Saved to db");
    res.json(req.body)
};

//controller to get all the available quizes in DB
exports.getAllQuizes = (req, res) => {
    Quiz.find()
    .exec((err, quizes) => {
        if(err || !quizes){
            return res.status(400).json({
                error: "No Quizes found in DB"
            });
        };
        res.json(quizes);
    });
};
