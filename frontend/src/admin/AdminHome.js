import React, { useState } from 'react';
import { isAuthenticated } from '../auth/authApiCalls';
import Base from "../Base";
import { createAQuiz } from './adminApicalls';




export default function AdminHome(props) {

    const [quiz, setQuiz] = useState({});
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const {user, token} = isAuthenticated();

    const handleChange = (e) => {
        const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], "UTF-8");
		fileReader.onload = (e) => {
		setQuiz(e.target.result);
		};
    }

    const handleSubmit = (e) => {
		e.preventDefault();
        console.log(user);
        createAQuiz(user._id, token, quiz)
        .then((data) => {
            if(!data) {
                setSuccess(false)
                setError(true)
            } else {
                setSuccess(true)
                setError(false)
            }
        })
	};

    const successMessage = () => {
        if (success) {
          return <h4 className="text-success">Quiz Created Successfully</h4>;
        }
      };


    const warningMessage = () => {
        if (error) {
        return <h4 className="text-danger">Failed to create Quiz... try again</h4>;
        }
    };
    return (
        <Base title="Admin panel" description="A page to upload Quizes !!" className="container bg-info p-4">
        <div>
        <form>
            <span>Upload a quiz file. (Only .JSON format allowed )</span>
            <label className="btn btn-block btn-success">
            <input
            onChange={handleChange}
            type="file"
            name="quiz"
            accept=".json"
            placeholder='Choose a JSON file'
            >
            </input>
            </label>
        </form>
        <button
        type="submit"
        onClick={handleSubmit}
        className="btn btn-success"
      >
        Create Quiz
      </button>
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
