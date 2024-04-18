import React, {MouseEventHandler, useEffect, useState} from 'react';
import {score} from "common/src/types";
import sort from "../sort";

function LeaderBoard() {
    const [scores, setScores] = useState<score[]>([]);
    const [method, setMethod] = useState("rank");

    useEffect(() => {
        const temp: score[] = [
            {username: 'Mike', score: 123, date: new Date()},
            {username: 'Mike', score: 13, date: new Date()},
            {username: 'Gabe', score: 45, date: new Date()},
            {username: 'Ronak', score: 56, date: new Date()},
            {username: 'Sai', score: 78, date: new Date()},
            {username: 'Klaudio', score: 54, date: new Date()},
        ];
        let newScores: score[] = []
        if (method === 'rank') {
            newScores = sort((a:score, b:score): boolean => {return a.score < b.score;}, temp);
        } else if (method === 'reverseRank') {
            newScores = sort((a:score, b:score): boolean => {return a.score > b.score;}, temp);
        } else if (method === 'date') {
            newScores = sort((a:score, b:score): boolean => {return a.date < b.date;}, temp);
        } else if (method === 'reverseDate') {
            newScores = sort((a:score, b:score): boolean => {return a.date > b.date;}, temp);
        } else if (method === 'username') {
            newScores = sort((a:score, b:score): boolean => {return a.username < b.username;}, temp);
        } else if (method === 'reverseUsername') {
            newScores = sort((a:score, b:score): boolean => {return a.username > b.username;}, temp);
        }

        setScores(newScores);
    }, [method]);

    function updateSortDate() {
        if (method === "date") {
            setMethod("reverseDate");
        } else {
            setMethod("date");
        }
    }
    function updateSortUsername() {
        if (method === "username") {
            setMethod("reverseUsername");
        } else {
            setMethod("username");
        }
    }

    function updateSortRank() {
        if (method === "rank") {
            setMethod("reverseRank");
        } else {
            setMethod("rank");
        }
    }

    return (
        <div className={"h-full flex flex-col bg-green-50 pt-8 items-center justify-center"}>
            <h1 className={"font-bold text-6xl mb-16"}>Leaderboard</h1>
            <table>
                <thead>
                    <tr>
                        <td onClick={updateSortRank} className={"font-bold w-12 text-center border-2"}>Rank</td>
                        <td onClick={updateSortDate} className={"font-bold w-40 text-center border-2"}>date</td>
                        <td onClick={updateSortUsername} className={"font-bold w-32 text-center border-2"}>Username</td>
                        <td onClick={updateSortRank} className={"font-bold w-32 text-center border-2"}>Score</td>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score: score, index: number) => (
                        <tr>
                            <td className={"w-12 text-center border-2"}>{index+1}</td>
                            <td className={"w-40 text-center border-2"}>{score.date.toDateString()}</td>
                            <td className={"w-32 text-center border-2"}>{score.username}</td>
                            <td className={"w-32 text-center border-2"}>{score.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LeaderBoard;
