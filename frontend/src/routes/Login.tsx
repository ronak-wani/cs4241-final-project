import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import Button from 'react-bootstrap/Button';
import axios from "axios";

const CLIENT_ID = "f0bb48553c39a2d19844";

function Login() {
    const [rerender, setRerender] = useState(false);
    const [userData, setUserData] = useState({})
    let githubUser = {}
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParams = urlParams.get("code");



        if (codeParams && localStorage.getItem("accessToken") === null) {
            const getAccessToken = async () => {
                console.log("inside access Token");
                try {
                    const response = await axios.get("http://localhost:3001/getAccessToken?code=" + codeParams, {
                        headers: {
                            mode: "no-cors",
                            credentials: "include"
                        }
                    });

                    console.log(response);
                    const data = await response.data;
                    console.log(data);
                    if (data.access_token) {
                        localStorage.setItem("accessToken", data.access_token);
                        setRerender(!rerender);
                    }
                } catch (error) {
                    console.error("Error fetching access token:", error);
                }
            };
            getAccessToken();
        }
    }, []);


    // const getUserData = async () => {
    //     const response = await fetch("http://localhost:3001/getUserData", {
    //         method: "GET",
    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem("accessToken"), //Bearer AccessToken
    //         }
    //     })
    //     const data = await response.json();
    //     console.log(data);
    //     setUserData(data);
    // }
    useEffect(() => {
        const getUserData = async () => {
            const response = await fetch("http://localhost:3001/getUserData", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                },
            });
            const data = await response.json();
            console.log(data);
            setUserData(data);
        };

        getUserData();
    }, []);

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
                 <button onClick={() => {localStorage.removeItem("accessToken"); setRerender(!rerender); window.location.href="/";}}>Logout</button>
                 <h3>Get User data</h3>
                 {/*<button onClick={getUserData}>Get Data</button>*/}

                 {Object.keys(userData).length !== 0 ?
                    <>
                        <h4>User Data: </h4>
                        <></>
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
