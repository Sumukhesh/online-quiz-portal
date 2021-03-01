import React, {useState, useEffect} from 'react';
import Base from '../Base';
import { isAuthenticated } from "../auth/authApiCalls";
import {getQuizById,getResultByQuizId} from "./quizApiCalls";
import Question from './Question';



const Quiz = () => {

    const { user, token } = isAuthenticated();
    const diffLevel = localStorage.getItem("user_difficultyLevel")
  
    const [questions, setQuestions] = useState([])
    const [quizId, setQuizId] = useState("")
    const [userResponses, setUserResponses] = useState({
        user_responses: []
    })
   const user_responses = userResponses.user_responses;
    const [result, setResult] = useState('');
    const preload = () => {
        
        getQuizById(user._id,diffLevel, token)
        .then((data) => {
            //console.log(data);
            if(data.error){
                console.log(data.error);
            } else {
                setQuestions(data.quiz_questions);
                //console.log(questions);
                setQuizId(data.quiz_id);
                //console.log(quizId);
                
            }
        })
        
    }

    const calculateResult = (e) => {
        e.preventDefault();
        setUserResponses({userResponses : user_responses})
        console.log(userResponses);
        getResultByQuizId(user._id, quizId, token, userResponses)
        .then((data) => {
            if(data.error){
                console.log(data.error);
            } else {
                setResult(data)
            }
        })
        
    }
  
    useEffect(() => {
        preload();
    }, []);
  
    
  
    return (
        <Base title="Quiz page" description="Answer the following questions !!">
            {questions.length > 0 && questions.map(({question, options},index) => (
            <Question question={question} options={options} id={index} selected={answer => {user_responses.push(answer)}}/>
            ))}
            <div>
                <button
                className="btn btn-lg btn-success m-3"
                onClick={calculateResult}
                >
                    calculate Result
                 </button>   
            <h4>
                Result: {result}
            </h4>
            </div>            
        </Base>
    )
  }
  
  export default Quiz

  
  