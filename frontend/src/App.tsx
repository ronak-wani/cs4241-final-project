import React from 'react';
import './App.css';
import {Outlet, RouterProvider} from "react-router";
import NavBar from "./components/NavBar";
import {createBrowserRouter} from "react-router-dom";
import Homepage from "./routes/Homepage";
import Example from "./routes/Example";
import LeaderBoard from "./routes/Leaderboard";
import Memory from "./routes/Memory";
import Instructions from "./routes/Instructions";
import Login from "./routes/Login";
import LoginCheck from "./components/LoginCheck";
import MultiplayerMemory from "./routes/MultiplayerMemory";


function App() {
  const router = createBrowserRouter([

    {
      path: "login",
      errorElement: <h2>Something went wrong!</h2>,
      element: <Login />,
    },
    {
      path: "/",
      errorElement: <h2>Something went wrong!</h2>,
      element: <Root />,
      children: [
        {
          path: "",
          element: <Homepage />,
        },
        {
          path: "example",
          element: <LoginCheck  component={<Example />}/>,
        },
        {
          path: "instructions",
          element: <Instructions />,
        },
        {
          path: "leaderboard",
          element: <LoginCheck  component={<LeaderBoard />}/>,
        },
        {
          path: "memory",
          element: <LoginCheck  component={<Memory />}/>,
        },
        {
          path: "multiplayer-memory",
          element: <LoginCheck  component={<MultiplayerMemory />}/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;

  function Root() {
    return (
      <div className="w-full h-screen flex flex-col">
        <NavBar />
        <Outlet />
      </div>
    );
  }
}

export default App;
