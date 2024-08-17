"use client"

import Todo from "@components/Todo";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { useCookies } from 'next/client';
import Link from "next/link";

export default function Home() {

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })
  const [TodoData, setTodoData] = useState([]);

  const fetchTodoData = async () => {
    const res = await axios("/api/todo");
    setTodoData(res.data.todos);
  }

  const deleteTodo = async (id) => {
    const res = await axios.delete("/api/todo", {
      params: {
        mongoId: id
      }
    });
    toast.success(res.data.message);
    fetchTodoData();
  }
  const completeTodo = async (id) => {
    const res = await axios.put("/api/todo", {}, {
      params: {
        mongoId: id
      }
    });
    toast.success(res.data.message);
    fetchTodoData();
  }


  useEffect(() => {
    fetchTodoData();
  }, [])

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post("/api/todo", formData);
      toast.success(response.data.message);
      await fetchTodoData();
    } catch (err) {
      toast.error("Can't add task")
    }

  }
  const onChangeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((form) => ({ ...form, [name]: value }));
    console.log(formData);
  }

  // const [cookies, setCookie, removeCookie] = useCookies(['token']);

  function userIsLoggedIn() {
    const router = useRouter();

    useEffect(() => {
      if (!cookies.token) {
        router.push('/api/login');
      }
    }, [cookies.token, router]); // Add dependencies array

    return !!cookies.token; // Returns true if token exists, false otherwise
  }

  const handleLogout = () => {
    removeCookie('token');
  };

  return (
    <>
      {
        userIsLoggedIn ? <div>
          <div>
            <ToastContainer theme="dark" />
            <form onSubmit={onSubmitHandle} className="justify-center items-center mx-auto w-[60%] flex flex-col p-4 ">
              <h2 className="text-3xl font-semibold mb-3 ">Add the task</h2>
              <input value={formData.title} onChange={onChangeHandle} placeholder="Enter title" name="title" className="w-full px-2 py-1 mb-3 text-slate-800 border-2 border-slate-500 rounded-md outline-none" />
              <textarea value={formData.description} onChange={onChangeHandle} placeholder="Enter the description " name="description" className="w-full px-2 py-1 mb-3 text-slate-800 border-2 border-slate-500 rounded-md outline-none" />
              <button type="submit" className="self-start rounded-md px-3 py-1 bg-green-500 text-white text-xl">Add task</button>
            </form>
          </div>
          <div>
            <div className="table self-center w-[70%] mx-auto mt-5">
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Id
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Title
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Description
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      TodoData.map((item, index) => {
                        return (
                          <Todo key={index} id={index}
                            title={item.title}
                            description={item.description}
                            mongoId={item._id}
                            isCompleted={item.isCompleted}
                            deleteTodo={deleteTodo}
                            completeTodo={completeTodo} />
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>


        </div> : <Link href="/api/login">Login from here</Link>
      }

    </>


  );
}
