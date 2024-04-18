import express, {Router, Request, Response, response} from "express";
import passport from 'passport';
const router: Router = express.Router();
import cors from 'cors';
//const fetch = (...args:any[]) => import('node-fetch').then(({default: fetch}) => fetch(...args));
import fetch from 'node-fetch'
// import { RequestInfo, RequestInit } from 'node-fetch';
// const fetch = (url:RequestInfo, init?:RequestInit) => import('node-fetch').then(module => module.default(url, init));
import bodyParser from 'body-parser';

const CLIENT_ID = "f0bb48553c39a2d19844";
const CLIENT_SECRET = "a8718689d2ebfedf377ccc7f86776540f0a778a2";

router.get("/getAccessToken", async (req, res) => {
    req.query.code;
    console.log("inside getAccessToken");
    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;
    await fetch("https://github.com/login/oauth/access_token"+params, {
        method: "POST",
        headers:{
            "Accept": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log("get access token: ")
        console.log(data)
        res.json(data);
    })
})

//getting user data
//access token passed in the header
// router.get("/getUserData", async (req, res) => {
//     const authorization = req.get("Authorization"); //Bearer AccessToken
//     console.log(authorization)
//     if(authorization){
//         await fetch("https://api.github.com/user", {
//             method: "GET",
//             headers: {
//                 "Authorization": authorization
//             }
//         }).then((data) => {
//             console.log("get user data: ")
//             console.log(data);
//             res.json(data);
//         })
//     }
//     else{
//         res.status(401).send("Not authorized");
//     }
//
// })
router.get("/getUserData", async (req, res) => {
    const authorization = req.get("Authorization"); //Bearer AccessToken
    console.log(authorization);

    if (authorization) {
        try {
            const response = await fetch("https://api.github.com/user", {
                method: "GET",
                headers: {
                    "Authorization": authorization,
                },
            });

            if (!response.ok) {
                // Handle non-2xx status codes (e.g., 404 not found)
                return res.status(response.status).send("Error fetching user data");
            }

            const userData = await response.json();
            console.log("User data:", userData);
            res.json(userData);
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).send("Internal server error");
        }
    } else {
        res.status(401).send("Not authorized");
    }
});


// router.get('/github', passport.authenticate('github', {scope: ['profile']}))
//
// router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
//     function(req, res) {
//         // Successful authentication, redirect home.
//         res.redirect('/')
//     }
// )

export default router;