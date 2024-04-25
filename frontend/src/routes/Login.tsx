import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import Button from 'react-bootstrap/Button';
import axios from "axios";

const CLIENT_ID = "f0bb48553c39a2d19844";

function Login() {
    const [rerender, setRerender] = useState(false);
    const [userData, setUserData] = useState({
        login: null
    })
    let githubUser = {}
    useEffect( () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParams = urlParams.get("code");
        const getUserData = async () => {
            const response = await fetch("api/auth/getUserData", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                },
            });
            const data = await response.json();
            console.log(data);
            setUserData(data);
        };

        if (codeParams && localStorage.getItem("accessToken") === null) {
            const getAccessToken = async () => {
                // console.log("inside access Token");
                try {
                    const response = await axios.get("api/auth/getAccessToken?code=" + codeParams, {
                        headers: {
                            mode: "no-cors",
                            credentials: "include"
                        }
                    });

                    // console.log(response);
                    const data = await response.data;
                    // console.log(data);
                    if (data.access_token) {
                        localStorage.setItem("accessToken", data.access_token);
                        setRerender(!rerender);
                    }
                } catch (error) {
                    console.error("Error fetching access token:", error);
                }
            };
            getAccessToken().then(() => {getUserData()});
        } else {
            getUserData();
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

    }, []);

    // function loginWithGithub(){
    //     window.location.assign("https://github.com/login/oauth/authorize?client_id="+CLIENT_ID);
    // }

    return (
        <>
            <NavBar />
        <main className="flex flex-col justify-center items-center align-items-center text-center login-entry login-page">
        <div role="region" aria-label="Login section" className="bg-gradient-to-r from-black to-green-500 w-2/3 p-8 bg-green-300 rounded-full">
                <h1 className="font-bold text-white">Login Success</h1>
            <h2 className="font-bold text-white">Welcome</h2>
        {/*<Button variant="primary" style={{textAlign: "center"}} onClick={loginWithGithub}>Login With GitHub</Button>*/}
            {localStorage.getItem("accessToken") ?
                <>

                        <button className="bg-green-950 hover:bg-emerald-300 text-white font-bold py-2 px-4 rounded-full"
                                style={{width: "30%"}} onClick={() => {
                            localStorage.removeItem("accessToken");
                            setRerender(!rerender);
                            window.location.href = "/";
                        }}>Logout
                        </button>
                        <button className="bg-green-950 hover:bg-emerald-300 text-white font-bold py-2 px-4 rounded-full"
                                style={{width: "30%"}} onClick={() => window.location.href = "/memory"}>Go Play</button>

                        <h2 className="font-bold text-white">User Data: </h2>
                        {/*<button onClick={getUserData}>Get Data</button>*/}

                        {Object.keys(userData).length !== 0 ?
                            <>
                                <div className="font-bold text-white">GitHub Username: {userData.login}</div>
                            </>
                            :
                            <>
                            </>
                        }

                </>
                :
                <>
                    <h3 className="font-bold text-white">User is not logged in</h3>
                </>
            }
            </div>
            </main>
        </>
    );
}

export default Login;
