import React, {useEffect, useState} from 'react';
import '../css/Memory.css';

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

    statusClass += ' w-32 h-32 flex justify-center items-center text-4xl font-serif transition duration-200'

    return (
        <div className={`w-32 h-32 flex justify-center items-center text-4xl font-serif transition duration-200 ${statusClass}`}
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

    const rows = 3, cols = 4;
    const [tiles] = useState<string[]>(createTiles(rows, cols));
    const [flippedTiles, setFlippedTiles] = useState<number[]>([]);
    const [doneTiles, setDoneTiles] = useState<number[]>([]);
    const [time, setTime] = useState<number>(0);
    const [startTime, setStartTime] = useState<number>((new Date()).getTime());
    const [intervalID, setIntervalID] = useState<NodeJS.Timer>();

    useEffect(() => {
        setStartTime((new Date()).getTime());
        setIntervalID(
            setInterval(() => {
                setTime((new Date()).getTime() - startTime)
            }, 10)
        );
    }, [])

    // function that handles the tile flipping and matching logic
    const handleTileClick = (tileID: number) => {
        // don't flip if:
        // if two tiles are already flipped
        // or the clicked tile is already flipped
        // or the clicked tile is already matched
        if (flippedTiles.length >= 2 || flippedTiles.includes(tileID) || doneTiles.includes(tileID)) {
            return;
        }

        if (flippedTiles.length === 1) {
            // if two tiles have just been flipped

            if (tiles[flippedTiles[0]] === tiles[tileID]) {
                // if the two tiles match

                // check if all tiles have been matched
                if (doneTiles.length + 2 === tiles.length) {
                    clearInterval(intervalID);
                    alert("You won! Time: " + msToReadable(time) + " seconds");
                }

                // add them to the doneTiles array
                setDoneTiles([...doneTiles, flippedTiles[0], tileID]);
            }

            // set a timer to hide them
            setTimeout(() => {
                setFlippedTiles([]);
            }, 1000);
        }

        // flip the tile that was clicked
        setFlippedTiles([...flippedTiles, tileID]);
    };

    function msToReadable(time: number) {
        let minutes = "";
        if (time >= 60000)
            minutes = (("0" + Math.floor((time / 60000) % 60)).slice(-2) + ":");

        const seconds = ("0" + Math.floor((time / 1000) % 60)).slice((time >= 10000) ? -2 : -1) + ".";
        const ms = ("0" + Math.floor((time / 10) % 100)).slice(-2);
        return minutes + seconds + ms;
    }

    // renders tile component for each tile in the game
    return (
        <div className="h-screen flex flex-col justify-center align-items-center text-center">
            <p>
                {msToReadable(time)} seconds
            </p>
            <div className={`mt-24 gap-4 max-w-screen-sm mx-auto grid ${'grid-cols-' + cols}`}>
                {tiles.map((value, index) => (
                    <Tile
                        key={index}
                        value={value}
                        isFlipped={flippedTiles.includes(index)}
                        isDone={doneTiles.includes(index)}
                        onClick={() => handleTileClick(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Memory;
