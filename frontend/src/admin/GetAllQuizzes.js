import React, { useEffect, useState } from 'react'
import Base from '../Base'
import {isAuthenticated} from '../auth/authApiCalls';
import { getAllQuizzes } from './adminApicalls';

const GetAllQuizzes = () => {

    const {user, token } = isAuthenticated()
    const [quizzes, setQuizzes] = useState([])
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        preload();
    }, [])

    const preload = () => {
        getAllQuizzes(user._id, token)
        .then((data) => {
            if(data.error){
                console.log(data.error);
                setError(true)
            } else {
                setQuizzes(data)
                setSuccess(true)
            }
        })

    } 

    const successMessage = () => {
        if (success) {
          return <h4 className="text-success">All the Quizzes are displayed above</h4>;
        }
      };


    const warningMessage = () => {
        if (error) {
        return <h4 className="text-danger">Failed to load quizzes.. </h4>;
        }
    };

    return (
        <Base title="Quizzes" description="All the available quizzes in DB" className="container bg-info p-4" >
            <div>
               {quizzes.length > 0 && quizzes.map(({quiz_key, quiz_questions, name, difficulty_level}, id) => (
                       <div className="p-3 m-3 container-fluid" key={id}>
                           <h3>{name} - ({difficulty_level})</h3>
                           {quiz_questions.map((ques, id) => (
                               <div key={id}>
                               <h4>
                                  {id+1}. {ques.question}
                               </h4>
                               <li>
                                   {ques.options[0]}
                               </li>
                               <li>
                                  { ques.options[1]}
                               </li>
                               <li>
                                  { ques.options[2]}
                               </li>
                               <li>
                                   {ques.options[3]}
                               </li>
                                </div>
                           ))}
                           <h3 className="m-2">Key for the Above Quiz is ..</h3>
                           <ol>
                           {quiz_key.map((ans, id) => (
                               
                               <li id={id}>{ans}</li>    
                     ))}
                           </ol>
                           
                        </div>   
               ))}
            </div>
       <div className="row bg-white rounded m-3">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
        </div>
      </div>
        </Base>
    )
}

export default GetAllQuizzes