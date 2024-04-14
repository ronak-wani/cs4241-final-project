import React from 'react';
import {employeeFeedback} from "common/src/types";
import axios from "axios";

function Example() {

    async function postData() {

        const data: employeeFeedback = {
            name: 'Mike',
            feedback: 'is an SA'
        }
        //sends a post request the /api/high-score
        const res = await axios.post("/api/example", data);
        if(res.status === 200) {
            console.log("added feedback");
        }
    }

    async function getData() {
        const res = await axios.get("api/example");
        console.log(res.data);
    }

    return (
        <div className="flex h-full bg-green-50 items-center justify-center gap-4 flex-column">
            <button onClick={postData} className={"h-16 w-48 bg-blue-950 text-white hover:bg-blue-200 hover:text-black rounded-2xl"}>post feedback</button>
            <button onClick={getData} className={"h-16 w-48 bg-blue-950 text-white hover:bg-blue-200 hover:text-black rounded-2xl"}>get feedback</button>
        </div>
    );
}

export default Example;
