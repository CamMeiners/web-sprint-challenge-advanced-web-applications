import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const initialCredentials = {
        username:'',
        password:''
    }
const {props, push} = useHistory();

    const [creds, setCreds] = useState(initialCredentials)
    const [error, setError] = useState('');
     const handleChange = e => {
        setCreds({
            ...creds,
            [e.target.name]: e.target.value
        });
      };
    //Task List
//1. Build login form DOM from scratch, making use of styled components if needed. Make sure the username input has id="username" and the password input as id="password".
//2. Add in a p tag with the id="error" under the login form for use in error display.
//3. Add in necessary local state to support login form and error display.
//4. When login form is submitted, make an http call to the login route. Save the auth token on a successful response and redirect to view page.
//5. If the response is not successful, display an error statement. **a server provided error message can be found in ```err.response.data```**
//6. MAKE SURE TO ADD id="username", id="password", id="error" AND id="submit" TO THE APPROPRIATE DOM ELEMENTS. YOUR AUTOTESTS WILL FAIL WITHOUT THEM.
    const login = e => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/login", creds)
          .then(resp => {
            localStorage.setItem("token", resp.data.token);
            push('/view');
          })
          .catch(err=> {
            console.log(err.response.data);
            setCreds(initialCredentials)
            setError(err.response.data.error)
          })
      };
    return(
        <ComponentContainer>
        <ModalContainer>
            <div>
            <h1>Welcome to Blogger Pro</h1>
            <h2>Please enter your account information.</h2>
            </div>
            <div>
        <form onSubmit={login}>
            Username:&nbsp;
          <input
            id='username'
            type="text"
            name="username"
            value={creds.username}
            onChange={handleChange}
          />
          Password:&nbsp;
          <input
            id='password'
            type="password"
            name="password"
            value={creds.password}
            onChange={handleChange}
          />
          <button id='submit'>Log in</button>
        </form>
        <p id='error'>{error}</p>
      </div>
        </ModalContainer>
    </ComponentContainer>);
}
export default Login;

//Task List
//1. Build login form DOM from scratch, making use of styled components if needed. Make sure the username input has id="username" and the password input as id="password".
//2. Add in a p tag with the id="error" under the login form for use in error display.
//3. Add in necessary local state to support login form and error display.
//4. When login form is submitted, make an http call to the login route. Save the auth token on a successful response and redirect to view page.
//5. If the response is not successful, display an error statement. **a server provided error message can be found in ```err.response.data```**
//6. MAKE SURE TO ADD id="username", id="password", id="error" AND id="submit" TO THE APPROPRIATE DOM ELEMENTS. YOUR AUTOTESTS WILL FAIL WITHOUT THEM.

const ComponentContainer = styled.div`
    height: 70%;
    justify-content: center;
    align-items: center;
    display:flex;
`

const ModalContainer = styled.div`
    width: 500px;
    background: white;
    padding: 2rem;
    text-align: center;
`

const Label = styled.label`
    display: block;
    text-align: left;
    font-size: 1.5rem;
`

const FormGroup = styled.form`
    padding:1rem;
`

const Input = styled.input`
    font-size: 1rem;
    padding: 1rem 0;
    width:100%;
`

const Button = styled.button`
    padding:1rem;
    width: 100%;
`