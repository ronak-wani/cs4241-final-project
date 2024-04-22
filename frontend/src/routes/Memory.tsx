import React, {useEffect, useState} from 'react';
import '../css/Memory.css';
import axios from 'axios';

// when interacting with the tile object, these are the props that it accepts
interface tileProps {
    value: string;
    onClick: () => void;
    isFlipped: boolean;
    isDone: boolean;
}

// represents an individual tile component
// if tile is flipped, shows value and vice-versa
// accepts props for value and an onClick handler
function Tile({ value, onClick, isFlipped, isDone }: tileProps) {
    let statusClass = 'bg-green-500 cursor-pointer';
    if (isDone) {
        statusClass = 'bg-blue-200 cursor-default';
    }
    else if (isFlipped) {
        statusClass = 'bg-green-200 cursor-default';
    }

    return (
        <div className={`flex-grow h-32 flex justify-center items-center text-4xl font-serif transition duration-200 ${statusClass}`}
             onClick={onClick}
        >
            {isFlipped ? value : ''}
        </div>
    );
}

// function for the game itself
function Memory() {
    function createTiles(rows: number, cols: number) {
        const values = Array.from({ length: rows * cols / 2 }, (_, index) => index);
        const shuffledValues = [...values, ...values].sort(() => Math.random() - 0.5);
        return shuffledValues.map((value) => String(value));
    }

    const [difficulty, setDifficulty] = useState<string>('easy');
    const [rows, setRows] = useState<number>(3);
    const [cols, setCols] = useState<number>(4);
    const [tiles, setTiles] = useState<string[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);

    const [time, setTime] = useState<number>(0);
    const [startTime, setStartTime] = useState<number>(0);
    const [intervalID, setIntervalID] = useState<NodeJS.Timer>();

    // states: idle, play, won
    const [state, setState] = useState<string>('idle');
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        const getUserData = async () => {
            const response = await fetch("http://localhost:5000/getUserData", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                },
            });
            const data = await response.json();
            setUsername(data.login);
        };
        getUserData();
    }, []);

    const handleWon = async () => {
        console.log(time, (new Date()).getTime(), username);
        const data = {
            username: username,
            score: time,
            game: 'memory-' + difficulty,
        }
        const response = await axios.post("/api/dbScoreRoutes", data)
    }

    useEffect(() => {
        if (state !== 'play') return;

        clearInterval(intervalID);
        setIntervalID(
            setInterval(() => {
                setTime((new Date()).getTime() - startTime)
            }, 10)
        );
    }, [startTime])

    useEffect(() => {
        if (state === 'play') {
            setTiles(createTiles(rows, cols));
            setFlipped([]);
            setMatched([]);

            setStartTime((new Date()).getTime());
        }
        else if (state === 'won') {
            clearInterval(intervalID);
            alert("You won! Time: " + msToReadable(time));
            setState('idle');

            handleWon();
        }
    }, [state])

    // function that handles the tile flipping and matching logic
    const handleTileClick = (tileID: number) => {
        if (state !== 'play') return;

        // don't flip if:
        // if two tiles are already flipped
        // or the clicked tile is already flipped
        // or the clicked tile is already matched
        if (flipped.length >= 2 || flipped.includes(tileID) || matched.includes(tileID)) {
            return;
        }

        if (flipped.length === 1) {
            // if two tiles have just been flipped

            if (tiles[flipped[0]] === tiles[tileID]) {
                // if the two tiles match

                // check if all tiles have been matched
                if (matched.length + 2 === tiles.length) {
                    setState('won');
                }

                // add them to the doneTiles array
                setMatched([...matched, flipped[0], tileID]);
            }

            // set a timer to hide them
            setTimeout(() => {
                setFlipped([]);
            }, 1000);
        }

        // flip the tile that was clicked
        setFlipped([...flipped, tileID]);
    };

    function handleDifficulty(e: React.ChangeEvent<HTMLSelectElement>) {
        setDifficulty(e.target.value);
        switch (e.target.value) {
            case 'easy':
                setRows(3);
                setCols(4);
                break;
            case 'medium':
                setRows(4);
                setCols(5);
                break;
            case 'hard':
                setRows(5);
                setCols(8);
                break;
        }
    }

    function msToReadable(time: number) {
        let minutes = "";
        if (time >= 60000)
            minutes = (("0" + Math.floor((time / 60000) % 60)).slice(-2) + ":");

        const seconds = ("0" + Math.floor((time / 1000) % 60)).slice((time >= 10000) ? -2 : -1) + ".";
        const ms = ("0" + Math.floor((time / 10) % 100)).slice(-2);
        return minutes + seconds + ms;
    }

    let grid_cols = '';
    if (cols === 4) grid_cols = 'grid-cols-4';
    else if (cols === 5) grid_cols = 'grid-cols-5';
    else if (cols === 8) grid_cols = 'grid-cols-8';

    // renders tile component for each tile in the game
    return (
        <div className="h-screen flex flex-col justify-center items-center align-items-center text-center">
            <div className="bg-gradient-to-r from-black to-green-500 w-2/3 gap-4 p-8 bg-green-300 rounded-full">
                <div className={`flex justify-center`}>
                    {state === 'idle' || state === 'won' ? (
                        <>
                            <button type="button" onClick={() => setState('play')}
                                    className="bg-green-900 hover:bg-emerald-300 text-white font-bold py-2 px-4 border-b-4 border-green-600 hover:border-blue-500 rounded">
                                Play
                            </button>

                            <label></label>
                            <select name="difficulty" id="difficulty" onChange={handleDifficulty}>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </>
                        ) : (
                        <p className="font-bold text-white">{msToReadable(time)}</p>
                    )}
                </div>
                <div
                    className={`gap-4 max-w-screen-sm mx-auto grid ${grid_cols} ${state === 'play' ? '' : 'opacity-25'}`}>
                    {tiles.map((value, index) => (
                        <Tile
                            key={index}
                            value={value}
                            isFlipped={flipped.includes(index)}
                            isDone={matched.includes(index)}
                            onClick={() => handleTileClick(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Memory;
