import React, {useState} from 'react'

const Question = ({question, options, id, selected}) => {
    const[answer, setAnswer] = useState(options);
    
    return (
        
        <div className="container-fluid">
            <h3>
             {id + 1}. {question} ?
            </h3>
            {
                answer.map((text, index) => (
                    <button
                    key={index}
                    className="btn btn-md btn-info m-3"
                    value={text} 
                    onClick={() => {
                        setAnswer([text])
                        selected(text)
                    }}
                    >
                        {text}
                    </button>
                ))
            }
        </div>
       
    )
}

export default Question;