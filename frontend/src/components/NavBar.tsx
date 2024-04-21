import React from 'react';

function NavBar() {
    return (
        <div style={{
            backgroundImage: "url('frontend/public/logo512.png')",
            backgroundSize: 'cover',
        }}
             className={"h-16 flex px-6 items-center w-screen bg-green-700 gap-4"}>
            <a className="font-mono font-bold text-2xl text-green-950 hover:text-emerald-300"
               href={"/"}>Homepage</a>
            <a className="font-mono font-bold text-2xl text-green-950 hover:text-emerald-300"
               href={"/login"}>Login</a>
            <a className=" font-mono font-bold text-2xl text-green-950 hover:text-emerald-300"
               href={"/leaderboard"}>Leaderboard</a>
            <a className="font-mono font-bold text-2xl text-green-950 hover:text-emerald-300"
               href={"/memory"}>Memory</a>
            <a className="font-mono font-bold text-2xl text-green-950 hover:text-emerald-300"
               href={"/example"}>Example</a>
        </div>
    );
}

export default NavBar;
