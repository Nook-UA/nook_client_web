"use client";
import { useState } from "react";
import { actionPost } from "./actionPost";
import { FaParking } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { motion } from "framer-motion";

import MyMap from "./Map";

export default function Page() {
    const [data, setData] = useState({});
    const [focused, setFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!data.name || !data.urlStream || !data.latitude || !data.longitude) return
        e.currentTarget.form?.requestSubmit()
      }


    return (
        <div className="w-full px-3 mt-10">
            <h1 className="text-4xl text-[#ee9559] font-extrabold flex gap-2 items-center">
                <div className="relative">
                    <FaParking className="text-4xl"/>
                    <div className="bg-white absolute top-[-6px] left-[20px] rounded-full aspect-square">
                        <IoMdAddCircle className="text-2xl"/>
                    </div>
                </div>
                Add Park
            </h1>
            <form className="flex flex-col gap-5 p-4" action={actionPost}>
                    <div className="relative">
                        <input type="text" name="name" id="name" className="border-2 border-gray-300 rounded-md p-2 w-full"
                        onChange={(e) => setData({...data, name: e.target.value})}
                        onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
                        />
                        <motion.label className="absolute"
                            animate={data.name || focused === "name" ? 
                                {scale: 0.8, top: "-15px", left: "0px",backgroundColor: "white",padding: "0 5px"} 
                                : 
                                {top: "18%", left: "10px"}
                            }
                        >
                            <span className="text-[#ee9559] text-lg">Park Name</span><span className="text-red-500">*</span>
                        </motion.label>
                    </div>
                    <div className="relative">
                        <input type="text" name="urlStream" id="urlStream" className="border-2 border-gray-300 rounded-md p-2 w-full"
                        onChange={(e) => setData({...data, urlStream: e.target.value})}
                        onFocus={() => setFocused("urlStream")} onBlur={() => setFocused("")}
                        />
                        <motion.label className="absolute"
                            animate={data.urlStream || focused === "urlStream" ? 
                                {scale: 0.8, top: "-15px", left: "0px",backgroundColor: "white",padding: "0 5px"} 
                                : 
                                {top: "18%", left: "10px"}
                            }
                        >
                            <span className="text-[#ee9559] text-lg">Camera Feed URL</span><span className="text-red-500"> *</span>
                        </motion.label>
                    </div>

                    {/* hidden values of map*/}
                    <input type="text" name="latitude" id="latitude" defaultValue={data.latitude || ""} hidden/>    
                    <input type="text" name="longitude" id="longitude" defaultValue={data.longitude || ""} hidden/>

                    <button onClick={handleSubmit}>Submit</button>
                </form>
                <div className="w-full h-[500px]">
                    <MyMap setData={setData} data={data}/>
                </div>
        </div>
    )
}