import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import Base from '../Base';
import Quiz from '../quiz/Quiz'

const UserHome = (props) => {

    const [difficulty, setDifficulty] = useState({
        difficultyLevel: "",
        getRedirect: false,
        loading: false,
        formData: "",
    })

    const preload = () => {
        setDifficulty({...difficulty, formData: new FormData()})
      };

      useEffect(() => {
          preload();
      }, [])

    const { difficultyLevel, getRedirect, loading, formData } = difficulty;

    const onSubmit = (event) => {
        event.preventDefault();
        setDifficulty({...difficulty, loading: true});
        localStorage.setItem("user_difficultyLevel", difficulty.difficultyLevel)
        props.history.push("/quiz");
    }

    const handleChange = (name) => (event) => {
        const value = event.target.value;
        formData.set(name, value);
        setDifficulty({...difficulty, [name]: value})
        console.log(value);
        
      };

    
    const difficultyLevelForm = () =>{
        return (
            <div>
            <form>
                
                <div className="form-group">
                    <select onChange={handleChange("difficultyLevel")}
                    className="form-control"
                    placeholder="difficultyLevel">
                        <option value=''>Select level</option>
                         <option value='easy'>
                             easy
                        </option>  
                        <option value='intermediate' >
                             intermediate
                        </option>  
                        <option value='hard' >
                             hard
                        </option>   
                    </select>
                </div>
                {(difficulty.difficultyLevel) &&
                    <button 
                    onClick={onSubmit}  
                    className="btn btn-outline-success mb-4"
                    type="submit"
                    >
                        
                        Start Quiz
                       
                    </button>
                }
            </form>
            </div>
              
        )
    }

    return (
       <Base title="User Home Page" description="Select difficulty Level and start a quiz !!">
          <div className="row bg-dark text-white rounded">
              <div className="col-md-8 offset-md-2">
              {difficultyLevelForm()}
              </div>
          </div>
        </Base>
    )
}

export default withRouter(UserHome)