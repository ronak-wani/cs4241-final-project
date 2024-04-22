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
          element: <Example />,
        },
        {
          path: "instructions",
          element: <Instructions />,
        },
        {
          path: "leaderboard",
          element: <LeaderBoard />,
        },
        {
          path: "memory",
          element: <Memory />,
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
