import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import Button from 'react-bootstrap/Button';
import axios from "axios";

const CLIENT_ID = "f0bb48553c39a2d19844";

function Login() {
    const [rerender, setRerender] = useState(false);
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParams = urlParams.get("code");

        //using local storage to keep the user logged in
        //grab access token from backend only if null
        if(codeParams && (localStorage.getItem("accessToken") === null)){
            const getAccessToken = async () =>{
                console.log("inside access token");
                await axios.get("http://localhost:3001/getAccessToken?code=" + codeParams,{
                    headers: {
                        credentials: "include"
                    }
                })
            }
            getAccessToken();
        }

    }, []);

    const getUserData = async () => {
        await fetch("http://localhost:3000/getUserData", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"), //Bearer AccessToken
            }
        }).then((response) =>{
            return response.json();
        }).then((data) => {
            console.log(data);
            setUserData(data);
        })
    }

    // function loginWithGithub(){
    //     window.location.assign("https://github.com/login/oauth/authorize?client_id="+CLIENT_ID);
    // }

    return (
        <>
            <NavBar />
        <h1>Login Success</h1>
        {/*<Button variant="primary" style={{textAlign: "center"}} onClick={loginWithGithub}>Login With GitHub</Button>*/}
            {localStorage.getItem("accessToken") ?
             <>
                 <h3>We have access token</h3>
                 <button onClick={() => {localStorage.removeItem("accessToken"); setRerender(!rerender);}}>Logout</button>
                 <h3>Get User data</h3>
                 <button onClick={getUserData}>Get Data</button>
                 {Object.keys(userData).length !== 0 ?
                    <>
                        <h4>User Data: </h4>
                    </>
                     :
                     <>
                     </>
                 }
             </>
                :
                <>
                    <h3>User is not logged in</h3>
                </>
            }
        </>
            );
}

export default Login;
