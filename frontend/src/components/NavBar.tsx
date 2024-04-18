import React from 'react';

function NavBar() {
    return (
        <div style={{
            backgroundImage: "url('frontend/public/logo512.png')",
            backgroundSize: 'cover',
        }}
             className={"h-16 flex px-6 items-center w-screen bg-emerald-200 gap-4"}>
            <a className="font-bold text-green-950 hover:text-green-600"
               href={"/"}>Homepage</a>
            <a className="font-bold text-green-950 hover:text-green-600"
               href={"/login"}>Login</a>
            <a className="font-bold text-green-950 hover:text-green-600"
               href={"/leaderboard"}>Leaderboard</a>
            <a className="font-bold text-green-950 hover:text-green-600"
               href={"/memory"}>Memory</a>
            <a className="font-bold text-green-950 hover:text-green-600"
               href={"/example"}>Example</a>
        </div>
    );
}

export default NavBar;
