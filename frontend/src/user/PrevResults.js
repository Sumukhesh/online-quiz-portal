import React, { useState, useEffect } from 'react';
import Base from '../Base';
import {isAuthenticated} from '../auth/authApiCalls';
import {getPrevResults} from './userApiCalls';

const PrevResults = () => {

    const {user, token} = isAuthenticated();
    const [prevResults, setPrevResults] = useState([]);
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)


    useEffect(() => {
        preload();
    }, [])

    const preload = () => {
        getPrevResults(user._id, token)
        .then((data) => {
            if(data.error){
                return console.log(data.error);
                setError(true)
            } else {
                setPrevResults(data);
                setSuccess(true);
            }
        })
    }

    const successMessage = () => {
        if (success) {
          return <h4 className="text-success">Previous quiz results of the {user.name} are displayed above</h4>;
        }
      };


    const warningMessage = () => {
        if (error) {
        return <h4 className="text-danger">Failed to load {user.name}'s previous quiz results </h4>;
        }
    }; 

    return (
       <Base title="Quiz Results" description="A page for prev quiz reults" className="container bg-info p-4">
           <div>
               <ol>
               {prevResults.length > 0 && prevResults.map((result, id) => (
                       <li key={id}>
                           {result}
                       </li>
               ))}
               </ol>
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

export default PrevResults;
