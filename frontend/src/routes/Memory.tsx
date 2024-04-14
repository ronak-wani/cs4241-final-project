import React, { useState } from 'react';
import '../css/Memory.css';

// interface for the tile object in the game
interface tileData {
    tileID: number;
    tileValue: string;
    isFlipped: boolean;
}

// added 12 data values since we're dealing with a 4 x 3 grid, so 6 pairs total
const tileDataValues: tileData[] = [
    { tileID: 1, tileValue: 'Blue', isFlipped: false },
    { tileID: 2, tileValue: 'Green', isFlipped: false },
    { tileID: 3, tileValue: 'Red', isFlipped: false },
    { tileID: 4, tileValue: 'Blue', isFlipped: false },
    { tileID: 5, tileValue: 'Green', isFlipped: false },
    { tileID: 6, tileValue: 'Red', isFlipped: false },
    { tileID: 7, tileValue: 'Yellow', isFlipped: false },
    { tileID: 8, tileValue: 'Yellow', isFlipped: false },
    { tileID: 9, tileValue: 'Purple', isFlipped: false },
    { tileID: 10, tileValue: 'Purple', isFlipped: false },
    { tileID: 11, tileValue: 'Orange', isFlipped: false },
    { tileID: 12, tileValue: 'Orange', isFlipped: false },
];

// when interacting with the tile object, these are the props that it accepts
interface tileProps {
    value: string;
    isFlipped: boolean;
    onClick: () => void;
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
    const [tiles, setTiles] = useState<tileData[]>(tileDataValues);
    const [flippedTiles, setFlippedTiles] = useState<number[]>([]);

    // function that handles the tile flipping and matching logic
    const handleTileClick = (tileID: number) => {
        // checks to see if two tiles have already been flipped
        // if so, waits for 1000 ms and then flips tiles back over to not show values
        if (flippedTiles.length === 2) {
            setTimeout(() => {
                setTiles(prevTiles =>
                    prevTiles.map(tile =>
                        flippedTiles.includes(tile.tileID) ? { ...tile, isFlipped: false } : tile
                    )
                );
                setFlippedTiles([]);
            }, 1000);

        // otherwise, clicked tile is flipped by setting boolean to true
        } else {
            const newTiles = tiles.map(tile =>
                tile.tileID === tileID ? { ...tile, isFlipped: true } : tile
            );
            setTiles(newTiles);
            setFlippedTiles([...flippedTiles, tileID]);
        }
    };

    // renders tile component for each tile in the game
    return (
        <div className="memory_game_board">
            {tiles.map(tile => (
                <Tile
                    key={tile.tileID}
                    value={tile.tileValue}
                    isFlipped={tile.isFlipped}
                    onClick={() => handleTileClick(tile.tileID)}
                />
            ))}
        </div>
    );
}

export default Memory;
