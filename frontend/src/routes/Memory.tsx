import React, { useState } from 'react';
import '../css/Memory.css';

// interface for the tile object in the game
interface tileData {
    tileID: number;
    tileValue: string;
}

// added 12 data values since we're dealing with a 4 x 3 grid, so 6 pairs total
const tileDataValues: tileData[] = [
    { tileID: 0, tileValue: 'Blue' },
    { tileID: 1, tileValue: 'Green' },
    { tileID: 2, tileValue: 'Red' },
    { tileID: 3, tileValue: 'Blue' },
    { tileID: 4, tileValue: 'Green' },
    { tileID: 5, tileValue: 'Red' },
    { tileID: 6, tileValue: 'Yellow' },
    { tileID: 7, tileValue: 'Yellow' },
    { tileID: 8, tileValue: 'Purple' },
    { tileID: 9, tileValue: 'Purple' },
    { tileID: 10, tileValue: 'Orange' },
    { tileID: 11, tileValue: 'Orange' },
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
    const [tiles] = useState<tileData[]>(tileDataValues);
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

            if (tiles[flippedTiles[0]].tileValue === tiles[tileID].tileValue) {
                // if the two tiles match, add them to the doneTiles array
                setTimeout(() => {
                    setDoneTiles([...doneTiles, flippedTiles[0], tileID]);
                }, 1000);
            }
            // set a timer to hide them
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
                    isDone={doneTiles.includes(tile.tileID)}
                    onClick={() => handleTileClick(tile.tileID)}
                />
            ))}
        </div>
    );
}

export default Memory;
