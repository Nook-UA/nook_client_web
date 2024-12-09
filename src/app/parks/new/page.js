"use client";
import { useState } from "react";
import { actionPost } from "./actionPost";

import MyMap from "./Map";

export default function Page() {
    const [data, setData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!data.name || !data.image || !data.latitude || !data.longitude) return
        e.currentTarget.form?.requestSubmit()
      }


    return (
        <div className="flex items-center w-full min-h-screen">
            <div className="w-[50%]">
                <h1 className="text-4xl font-bold text-[#FFAC75]">Create a new Park</h1>
                <form className="flex flex-col gap-2 bg-gray-200 p-4" action={actionPost}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" 
                    onChange={(e) => setData({...data, name: e.target.value})}/>
                    <label htmlFor="image">Url Stream</label>
                    <input type="text" name="urlStream" id="urlStream" 
                    onChange={(e) => setData({...data, image: e.target.value})}/>
                    <input type="text" name="latitude" id="latitude" defaultValue={data.latitude || ""} hidden/>
                    <input type="text" name="longitude" id="longitude" defaultValue={data.longitude || ""} hidden/>
                    <button onClick={handleSubmit}>Submit</button>
                </form>
            </div>
            <div className="w-[50%] h-screen">
                <MyMap setData={setData} data={data}/>
            </div>
        </div>
    )
}