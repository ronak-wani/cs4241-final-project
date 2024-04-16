import React from 'react';
import Button from "react-bootstrap/Button";
const CLIENT_ID = "f0bb48553c39a2d19844";

function Homepage() {

    function loginWithGithub(){
        window.location.assign("https://github.com/login/oauth/authorize?client_id="+CLIENT_ID);
    }

    return (
        <>
            <div className="login-entry">
                <h1>Homepage</h1>
                <h1>Please Login</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    style={{width: "30%"}} onClick={loginWithGithub}>Login With GitHub
                </button>
            </div>

        </>
    );
}

export default Homepage;
