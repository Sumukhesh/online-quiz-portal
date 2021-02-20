const User = require("../models/user");
const Quiz = require("../models/quiz");
const formidable = require("formidable");
const fs = require('fs');



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
exports.getQuizByDifficultyLevel = (req, res, difficultyLevel, next) => {
    Quiz.findOne({difficulty_level: `${difficultyLevel}`})
    .exec((err,quiz) => {
        if(err || !quiz){
            return res.status(400).json({
                error: "Cant find the quiz with the given difficulty level"
            })
        }
        var quizObj;
        quizObj.quizId = quiz._id;
        quizObj.name = quiz.name;
        quizObj.questions = quiz.quiz_questions;
        quizObj.difficultyLevel = quiz.difficulty_level;

        res.json(quizObj);
        next();
    })
};

//Controller to calculate the result of the quiz
exports.getResultByQuizId = (req,res) => {
    var key = quiz.quiz_key;
    var userResponses = req.user_responses
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
        //console.log(result.length);
        return result.length; 
      }

    var finalResult = result(userResponses, key); 
    res.json(finalResult);  
};

//controller to create quiz
exports.createQuiz = (req, res) => {
    let form = new formidable.IncomingForm()
    form.parse(req, (err,file) => {
        if(err || !file){
            return res.status(400).json({
                error: "Problem with uploading JSON file"
            });
        };

        //Initalizing quiz model 
        let quiz = new Quiz();
        let rawQuiz = fs.readFileSync(file);
        quiz = JSON.parse(rawQuiz);

        //saving quiz to db
        quiz.save((err, quiz) => {
            if(err){
                res.status(400).json({
                    error: "Saving quiz to DB failed"
                });
            };
            res.json(quiz);
        });
    });
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
