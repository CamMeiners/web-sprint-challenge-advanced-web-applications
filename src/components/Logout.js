import React from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

const Logout = () => {      
    const { push } =   useHistory();
    useEffect(()=> {
        axiosWithAuth()
            .post('http://localhost:5000/api/logout')
            .then(resp=>{
                localStorage.removeItem("token");
                push('/login');
            }).catch(err=> {
                console.log(err);
            })
    }, []);
    return(<div></div>);
}

export default Logout;

// Task List
// 1. On mount, execute a http request to the logout endpoint.
// 2. On a successful request, remove the token from localStorage and redirect to the login page.