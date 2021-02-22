import React from 'react'

const Test = () => {

    const onSubmit = event => {
        event.preventDefault();
        return(
            <div>
                <h1 className="text-dark">
                    User info submitted !!
                </h1>
            </div>
        )
    }
    
    const signUpForm = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <form>
                <div className="form-group">
                  <label className="text-dark">Name</label>
                  <input className="form-control"  type="text" />
                </div>
                <div className="form-group">
                  <label className="text-dark">Email</label>
                  <input className="form-control" type="email" />
                </div>
                <div className="form-group">
                  <label className="text-dark">Password</label>
                  <input className="form-control"  type="password" />
                </div>
                <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
              </form>
            </div>
          </div>
        );
      };


    return (
        signUpForm()
    )
}

export default Test;