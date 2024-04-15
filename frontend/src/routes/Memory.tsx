import React, { useState } from 'react';
import '../css/Memory.css';

const values = [
    'Blue', 'Green', 'Red', 'Blue', 'Green', 'Red', 'Yellow', 'Yellow', 'Purple', 'Purple', 'Orange', 'Orange'
];

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
    return (
        <div className={`tile_component ${isFlipped ? 'isFlipped' : ''} ${isDone ? 'isDone' : ''}`} onClick={onClick}>
            {isFlipped ? value : ''}
        </div>
    );
}

// function for the game itself
function Memory() {

    // useState hooks to manage state of tiles and IDs of flipped ones
    const [tiles] = useState<string[]>(values);
    const [flippedTiles, setFlippedTiles] = useState<number[]>([]);
    const [doneTiles, setDoneTiles] = useState<number[]>([]);

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
            // set a timer to hide them
            setTimeout(() => {
                setFlippedTiles([]);
                if (tiles[flippedTiles[0]] === tiles[tileID]) {
                    // if the two tiles match, add them to the doneTiles array
                    setDoneTiles([...doneTiles, flippedTiles[0], tileID]);
                }
            }, 1000);
        }

        // flip the tile that was clicked
        setFlippedTiles([...flippedTiles, tileID]);
    };

    // renders tile component for each tile in the game
    return (
        <div className="memory_game_board">
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
    );
}

export default Memory;
