import React from 'react';

function NavBar() {
    return (
        <div className={"h-16 flex px-6 items-center w-screen bg-emerald-200 gap-4"}>
            <a className="font-bold text-green-950-600 hover:text-blue-800 visited:text-darkgreen-600"
               href={"/"}>Homepage</a>
            <a href={"/login"}>Login</a>
            <a href={"/leaderboard"}>Leaderboard</a>
            <a href={"/memory"}>Memory</a>
            <a href={"/instructions"}>Instructions</a>
            <a href={"/example"}>Example</a>
        </div>
    );
}

export default NavBar;
