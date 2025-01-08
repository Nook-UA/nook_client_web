"use client";
import { useState } from "react";
import { actionPost } from "./actionPost";
import { FaParking } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { motion } from "framer-motion";
import { Button } from "@/components";
import { MdCancel,MdCheckCircle,MdCloudUpload,MdOutlineWarning } from "react-icons/md";
import { useRef } from "react";


import MyMap from "./Map";
import { useRouter } from "next/navigation";



export default function Page() {
    const [data, setData] = useState({});
    const [focused, setFocused] = useState(false);
    const [hoverImg, setHoverImg] = useState(false);
    const [warning, setWarning] = useState(false);
    const previewImgRef = useRef(null);
    const fileInputRef = useRef(null);
    const [hasSrc, setHasSrc] = useState(false);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!data.name || !data.urlStream || !data.latitude || !data.longitude || !data.file){
            setWarning(true)
            return
        }
        e.currentTarget.form?.requestSubmit()
    }

    const handleFileChange = (file) => {
        const fileType = file.type;
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validTypes.includes(fileType)) {
            alert("Invalid file type. Please upload a JPEG, PNG, or GIF image.");
            setData({...data, file: null});
            setHasSrc(false);
            return
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            previewImgRef.current.src = e.target.result;
        }

        reader.readAsDataURL(file);
        setData({...data, file: file});
        setHasSrc(true);

    };


    return (
        <div className="w-full mt-5 px-20">
            <motion.button className="fixed right-[50%] top-2 rounded-lg bg-red-400 border-2 border-red-600 text-white p-2"
                initial={{ opacity: 0, y: "-100%" }}
                animate={warning ? "open" : "closed"}
                variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: "-100%" },
                }}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setWarning(false)}
            >
                <div className="flex gap-2 items-center">
                    <MdOutlineWarning className="text-2xl"/>
                    <p className="text-sm">Please fill all the required fields</p>
                </div>
            </motion.button>
            <h1 className="text-4xl text-[#ee9559] font-extrabold flex gap-2 items-center">
                <div className="relative">
                    <FaParking className="text-4xl"/>
                    <div className="bg-white absolute top-[-6px] left-[20px] rounded-full aspect-square">
                        <IoMdAddCircle className="text-2xl"/>
                    </div>
                </div>
                Add Park
            </h1>
            <div className="flex w-full">
                <form className="flex gap-5 pt-2 w-full justify-center" action={actionPost}>
                    <input type="file" name="file" id="file" className="hidden" ref={fileInputRef} onChange={(e) => handleFileChange(e.target.files[0])}/>
                    <div className="flex flex-col gap-5 pt-2 justify-center mr-auto w-[50%]">
                        <div className="relative">
                            <input type="text" name="name" id="name" className="border-2 border-gray-300 rounded-md p-2 w-full"
                            onChange={(e) => setData({...data, name: e.target.value})}
                            onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
                            />
                            <motion.label className="absolute pointer-events-none top-[18%] left-[10px]"
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
                            <motion.label className="absolute pointer-events-none top-[18%] left-[10px]"
                                animate={data.urlStream || focused === "urlStream" ? 
                                    {scale: 0.8, top: "-15px", left: "0px",backgroundColor: "white",padding: "0 5px"} 
                                    : 
                                    {top: "18%", left: "10px"}
                                }
                            >
                                <span className="text-[#ee9559] text-lg">Camera Feed URL</span><span className="text-red-500">*</span>
                            </motion.label>
                        </div>

                        {/* hidden values of map*/}
                        <input type="text" name="latitude" id="latitude" defaultValue={data.latitude || ""} hidden/>    
                        <input type="text" name="longitude" id="longitude" defaultValue={data.longitude || ""} hidden/>
                        <div className="flex gap-2">
                            <Button onClick={handleSubmit} className={"bg-[#ee9559] p-2 text-white rounded-md"}><MdCheckCircle className="text-2xl"/>Submit</Button>
                            <Button onClick={() => router.back()} className={"bg-red-500 p-2 text-white rounded-md"}><MdCancel className="text-2xl"/>Cancel</Button>
                        </div>
                    </div>
                    <div className="w-[40%]">
                        <p className="mt-auto text-[#ee9559] text-2xl font-bold">Image Preview:</p>
                        <div className="relative border-3 p-1 border-[#ee9559] rounded-md overflow-hidden" onMouseEnter={() => setHoverImg(true)} onMouseLeave={() => setHoverImg(false)} onMouseDown={() => fileInputRef.current.click()}>
                            <img src="" alt="" className="aspect-video w-full z-0" ref={previewImgRef}/>
                            <motion.div 
                                className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
                                bg-white z-20 aspect-video w-full flex items-center justify-center bg-opacity-60
                                flex-col gap-3"
                                animate={hoverImg || !hasSrc ? {opacity: 1} : {opacity: 0}}
                            >   
                                <MdCloudUpload className="text-6xl text-gray-700"/>
                                <p className="text-3xl text-gray-600 text-center">Upload Image</p>
                            </motion.div>
                        </div>    
                    </div>
                </form>
            </div>
            <p className="mt-auto text-[#ee9559] text-2xl font-bold">Location:<span className="text-red-500">*</span></p>
            <div className="w-full h-[500px] border-3 p-1 border-[#ee9559] rounded-md overflow-hidden mt-2">
                <MyMap setData={setData} data={data}/>
            </div>
        </div>
    )
}