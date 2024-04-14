import React from 'react';
import NavBar from "../components/NavBar";
import Button from 'react-bootstrap/Button';

function Login() {
    const handleClick = async () => {
        const response = await fetch(`http://localhost:3000/auth/github`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        });
    };

    return (
        <>
            <NavBar />
        <h1>Login</h1>
        <Button onClick={() => handleClick()} variant="success">Login with GitHub</Button>{' '}

        </>
            );
}

export default Login;
