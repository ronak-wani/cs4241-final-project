import React from 'react';
import Button from "react-bootstrap/Button";
const CLIENT_ID = "f0bb48553c39a2d19844";

function Homepage() {

    function loginWithGithub(){
        window.location.assign("https://github.com/login/oauth/authorize?client_id="+CLIENT_ID);
    }

    return (
        <>

        <h1>Homepage</h1>
    <h1>Login</h1>
    <Button variant="primary" style={{textAlign: "center"}} onClick={loginWithGithub}>Login With GitHub</Button>
        </>
            );
}

export default Homepage;
