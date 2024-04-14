import React, { useState } from 'react';
import '../css/Memory.css';

// interface for the tile object in the game
interface tileData {
    tileID: number;
    tileValue: string;
}

// added 12 data values since we're dealing with a 4 x 3 grid, so 6 pairs total
const tileDataValues: tileData[] = [
    { tileID: 1, tileValue: 'Blue' },
    { tileID: 2, tileValue: 'Green' },
    { tileID: 3, tileValue: 'Red' },
    { tileID: 4, tileValue: 'Blue' },
    { tileID: 5, tileValue: 'Green' },
    { tileID: 6, tileValue: 'Red' },
    { tileID: 7, tileValue: 'Yellow' },
    { tileID: 8, tileValue: 'Yellow' },
    { tileID: 9, tileValue: 'Purple' },
    { tileID: 10, tileValue: 'Purple' },
    { tileID: 11, tileValue: 'Orange' },
    { tileID: 12, tileValue: 'Orange' },
];

// when interacting with the tile object, these are the props that it accepts
interface tileProps {
    value: string;
    onClick: () => void;
    isFlipped: boolean;
}

// represents an individual tile component
// if tile is flipped, shows value and vice-versa
// accepts props for value and an onClick handler
function Tile({ value, onClick, isFlipped }: tileProps) {
    return (
        <div className={`tile_component ${isFlipped ? 'isFlipped' : ''}`} onClick={onClick}>
            {isFlipped ? value : ''}
        </div>
    );
}

// function for the game itself
function Memory() {

    // useState hooks to manage state of tiles and IDs of flipped ones
    const [tiles] = useState<tileData[]>(tileDataValues);
    const [flippedTiles, setFlippedTiles] = useState<number[]>([]);

    // function that handles the tile flipping and matching logic
    const handleTileClick = (tileID: number) => {
        // if two tiles are already flipped or the clicked tile is already flipped, don't flip
        if (flippedTiles.length >= 2 || flippedTiles.includes(tileID)) {
            return;
        }

        if (flippedTiles.length === 1) {
            // if two tiles have just been flipped, set a timer to hide them
            setTimeout(() => {
                setFlippedTiles([]);
            }, 1000);
        }

        // flip the tile that was clicked
        setFlippedTiles([...flippedTiles, tileID]);
    };

    // renders tile component for each tile in the game
    return (
        <div className="memory_game_board">
            {tiles.map(tile => (
                <Tile
                    key={tile.tileID}
                    value={tile.tileValue}
                    isFlipped={flippedTiles.includes(tile.tileID)}
                    onClick={() => handleTileClick(tile.tileID)}
                />
            ))}
        </div>
    );
}

export default Memory;
