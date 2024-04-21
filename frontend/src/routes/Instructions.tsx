import React from 'react';
import img1 from './img1.png';
import img2 from './img2.png';

function Instructions() {

    return (
        <>
            <div className="instructions">
                <h1>Instructions</h1>
                <hr/>
                <h2>Navigation</h2>
                <ul>
                    <li>Login using your GitHub account</li>
                    <li>After successful login, you will land in the login success page that displays the user's
                        information
                    </li>
                    <li>Use the button on that page to go the game page or use the navigation bar on the top</li>
                    <li>The logout button will log you out and return back to the homepage</li>
                </ul>
                <h2>Playing The Game</h2>
                <hr/>
                <ol>
                    <li>Click the play button and the timer will start</li>
                    <li>Click on one tile to open it and see the content</li>
                    <li>Click on another tile to open it</li>
                    <li>If both the opened tiles have the same content then they are matched set and greyed out</li>
                    <li>If the tiles do not match, both the opened tiles will automatically close</li>
                    <li>Repeat the process until you clear out all the pair of tiles</li>
                    <li>After the game is completed, an alert is thrown with the time taken to complete</li>
                    <li>BE SURE TO REMEMBER WHAT'S IN THE TILES!!!</li>
                </ol>
                <img className="images" src={img1}/> <img className="images" src={img2}/>
                <h3>Difficulty Levels</h3>
                <h6>There are 3 different difficulty levels, each level has a different size of board</h6>
                <ol>
                    <li>Memory-Easy - Board dimension = </li>
                    <li>Memory-Medium - Board dimension = </li>
                    <li>Memory-Hard - Board dimension = </li>
                </ol>
                <h2>Scoring The Game</h2>
                <hr/>
                <ul>
                    <li>The score is calculated based on the time taken to complete the game</li>
                    <li>The leaderboard displays a few top players with highest scores respective to each difficulty level</li>
                </ul>
            </div>
        </>
    );
}

export default Instructions;
