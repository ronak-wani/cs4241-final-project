import React, {useEffect, useState} from 'react';
import {score} from "common/src/types";

function LeaderBoard() {
    const [scores, setScores] = useState<score[]>([]);
    useEffect(() => {
        const temp: score[] = [
            {username: 'Mike', score: 123, date: new Date()},
            {username: 'Mike', score: 13, date: new Date()},
            {username: 'Gabe', score: 45, date: new Date()},
            {username: 'Ronak', score: 56, date: new Date()},
            {username: 'Sai', score: 78, date: new Date()},
            {username: 'Klaudio', score: 54, date: new Date()},
        ];
        setScores(temp);
    }, []);


    return (
        <div className={"h-full flex flex-col bg-green-50 pt-8 items-center justify-center"}>
            <h1 className={"font-bold text-6xl mb-16"}>Leaderboard</h1>
            <table>
                <thead>
                    <tr>
                        <td className={"font-bold w-12 text-center border-2"}>Rank</td>
                        <td className={"font-bold w-40 text-center border-2"}>date</td>
                        <td className={"font-bold w-32 text-center border-2"}>Username</td>
                        <td className={"font-bold w-32 text-center border-2"}>Score</td>
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
