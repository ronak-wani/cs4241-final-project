import React from 'react';

function NavBar() {

    return (
        <>
            {
                localStorage.getItem("accessToken") === null ? (
                    <div className={"h-16 flex px-6 items-center w-screen bg-green-700 gap-4"} role="navigation" aria-label="Main navigation" >
                        <a className="font-mono font-bold text-2xl text-green-950 hover:text-emerald-300"
                           href={"/"} title="Go to login page">Login</a>
                        <a className="font-mono font-bold text-2xl text-green-950 hover:text-emerald-300"
                           href={"/instructions"} title="Go to instructions page">Instructions</a>
                    </div>
                ) : (
                    <div className={"h-16 flex px-6 items-center w-screen bg-green-700 gap-4"} role="navigation" aria-label="Main navigation" >
                        <a className="font-mono font-bold text-2xl text-green-950 hover:text-emerald-300"
                           href={"/login"} title="Return to homepage">Homepage</a>
                        <a className=" font-mono font-bold text-2xl text-green-950 hover:text-emerald-300"
                           href={"/leaderboard"} title="Go to leaderboard">Leaderboard</a>
                        <a className="font-mono font-bold text-2xl text-green-950 hover:text-emerald-300"
                           href={"/instructions"} title="Go to instructions page">Instructions</a>
                        <a className="font-mono font-bold text-2xl text-green-950 hover:text-emerald-300"
                           href={"/memory"} title="Go to game page">Memory</a>
                        <a className="font-mono font-bold text-2xl text-green-950 hover:text-emerald-300"
                           href={"/example"}>Example</a>
                        <a className="font-mono font-bold text-2xl text-green-950 hover:text-emerald-300"
                           href={"/multiplayer-memory"}>Multiplayer</a>
                    </div>
                )
            }
        </>

    )
}

export default NavBar;
