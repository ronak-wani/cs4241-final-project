import React from 'react';

type Prop = {
    selected: number;
    buttonNumber: number;
    setSelected: (n: number) => void;
    setDifficulty: () => void;
    difficulty: string;
}
function DifficultySelectButton(props: Prop) {
    function handleClick() {
        props.setDifficulty();
        props.setSelected(props.buttonNumber);
    }

    return (
        <button className={props.selected === props.buttonNumber?"bg-blue-950 text-white w-32 h-8 rounded-2xl": "bg-blue-300 text-black w-32 h-8 rounded-2xl"}
                onClick={handleClick}>{props.difficulty}
        </button>
    );
}

export default DifficultySelectButton;
