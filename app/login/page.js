"use client"
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const page = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post("/api/login", formData);
            toast.success(response.data.message);
        } catch (err) {
            toast.error("Can't add task")
        }
    }

        const onChangeHandle = (e) => {
            const name = e.target.name;
            const value = e.target.value;
            setFormData((form) => ({ ...formData, [name]: value }))
            console.log(formData);
        }
        return (
            <>  
                <ToastContainer theme="dark"/>
                <form  onSubmit={onSubmitHandle}   className="m-5 self-center items-center justify-center p-3 flex flex-col ">
                    <input value={formData.email}    type="email" name="email" onChange={onChangeHandle} placeholder="Enter your mail" className="px-3 m-2 py-2 border-2 border-gray-700 ouline-none" />
                    <input  value={formData.password}   type="password" name="password" onChange={onChangeHandle}  placeholder="Enter your password" className="px-3 m-2 py-2 border-2 border-gray-700 ouline-none" />
                    <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded-lg justify-self-start" >SignIn</button>
                </form>
            </>
        )
    }

    export default page;
