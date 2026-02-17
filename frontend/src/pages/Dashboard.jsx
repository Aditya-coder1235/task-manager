import {useRef,useState,useEffect} from 'react'
import { BookCheck } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { Settings } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { Search } from "lucide-react";
import { CirclePlus } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

const Dashboard = () => {
    const navigate=useNavigate()

    const form = useRef(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
    });

    const createTask = async (e) => {
        try {
            let res=await axios.post(
                "http://localhost:5000/api/tasks",
                formData,
                { withCredentials: true }, 
            );

            setFormData({
                title: "",
                description: "",
                dueDate: "",
            });

            console.log(res.data)
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create task");
        } 
    };


    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        createTask()
        setError("");
    };


    const handleScroll = () => {
        form.current.scrollIntoView({
            behavior: "smooth",
        });
    };

     const handleLogout = async () => {
         try {
             await axios.post(
                 "http://localhost:5000/api/auth/logout",
                 {},
                 { withCredentials: true },
             );
             localStorage.removeItem("user")
             localStorage.removeItem("userId")


             navigate("/login");
         } catch (err) {
             console.error("Logout failed");
         }
     };

     const user=localStorage.getItem("user")


  return (
      <div className="min-h-screen flex">
          <div className="bg-white rounded-l-2xl min-h-screen w-[30%] md:w-[18%]">
              <img
                  src="data:image/png;base64,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"
                  alt=""
                  className="md:h-18 h-10 m-auto mt-5 md:mt-10"
              />
              <h1 className="text-center text-sm md:font-semibold text-purple-600">
                  Task Manager
              </h1>

              <nav className="flex  flex-col justify-center items-center pt-13 gap-10 md:gap-5">
                  <Link
                      to={"/"}
                      className="w-30 h-5 text-sm md:w-46 md:h-11 flex items-center justify-start cursor-pointer rounded md:gap-2 ps-3 hover:text-purple-600"
                  >
                      <LayoutDashboard size={20} className="text-gray-500 " />
                      Dashboard
                  </Link>
                  <div
                      className=" w-30 h-5 text-sm md:w-46 md:h-11 flex items-center justify-start cursor-pointer rounded md:gap-2 ps-3 hover:text-purple-600"
                      onClick={() => navigate("/task")}
                  >
                      <BookCheck size={20} className="text-gray-500" />
                      Manage Task
                  </div>
                  <div
                      className=" w-30 h-5 text-sm md:w-46 md:h-11 flex items-center justify-start cursor-pointer rounded md:gap-2 ps-3 hover:text-purple-600"
                      onClick={() => navigate("/user")}
                  >
                      <CircleUserRound size={20} className="text-gray-500" />{" "}
                      User
                  </div>

                  <button
                      className=" w-30 h-5 text-sm md:w-46 md:h-11 flex items-center justify-start cursor-pointer rounded md:gap-2 ps-3 hover:text-purple-600"
                      onClick={() => handleLogout()}
                  >
                      Logout
                  </button>
              </nav>
          </div>
          <div className="bg-gray-200 h-auto w-full md:w-[82%] p-10 flex">
              <div className=" w-[70%] flex flex-col gap-15">
                  <div className=" w-[70%] flex">
                      <div className="relative left-48 top-2 md:left-65 md:top-2 text-gray-400">
                          <Search />
                      </div>
                      <input
                          type="text"
                          placeholder="Search"
                          className="ps-5 bg-white shadow-xl  w-70 h-10 rounded-3xl focus:outline-purple-500"
                      />
                  </div>

                  <div className="bg-white shadow-2xl h-auto w-70 md:w-[98%] p-8 rounded-xl flex">
                      <div className="flex flex-col gap-3 w-f">
                          <h2 className="font-semibold text-xl text-gray-600">
                              Welcome {user}
                          </h2>
                          <h1 className="text-2xl text-gray-500 font-bold">
                              Your Task Management Area
                          </h1>
                          <div
                              className="bg-purple-500 h-16 w-30 rounded-3xl mt-5 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-purple-700"
                              onClick={handleScroll}
                          >
                              <div className="text-white">
                                  <CirclePlus />
                              </div>
                              <p className="text-xs text-white">Add New Task</p>
                          </div>
                      </div>
                      <div className="hidden md:block">
                          <img
                              src="https://img.freepik.com/free-vector/illustrated-woman-booking-appointment-calendar_23-2148563060.jpg?semt=ais_user_personalization&w=740&q=80"
                              alt=""
                              //   className='h-85'
                          />
                      </div>
                  </div>

                  <div
                      className="bg-white shadow-2xl w-70 md:w-full rounded-xl p-6 "
                      ref={form}
                  >
                      <h2 className="text-2xl font-semibold  mb-4">
                          Create New Task
                      </h2>

                      {error && (
                          <p className="text-red-500 text-sm mb-3">{error}</p>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                              <label className="block text-sm font-medium mb-1">
                                  Task Title
                              </label>
                              <input
                                  type="text"
                                  name="title"
                                  value={formData.title}
                                  onChange={handleChange}
                                  placeholder="Enter task title"
                                  className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none"
                              />
                          </div>

                          <div>
                              <label className="block text-sm font-medium 0 mb-1">
                                  Description
                              </label>
                              <textarea
                                  name="description"
                                  value={formData.description}
                                  onChange={handleChange}
                                  placeholder="Optional description"
                                  rows="3"
                                  className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none"
                              />
                          </div>

                          <div>
                              <label className="block text-sm font-medium t-700 mb-1">
                                  Due Date
                              </label>
                              <input
                                  type="date"
                                  name="dueDate"
                                  value={formData.dueDate}
                                  onChange={handleChange}
                                  className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none"
                              />
                          </div>

                          <button
                              type="submit"
                              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition"
                          >
                              Add Task
                          </button>
                      </form>
                  </div>
              </div>

              <div className=" w-[30%] p-5  hidden md:block">
                  <div className="flex flex-col gap-13">
                      <div>
                          <h1 className="text-xl font-bold text-purple-600">
                              February{" "}
                              <span>{new Date().toLocaleDateString()}</span>
                          </h1>
                      </div>

                      <div className="bg-white shadow-2xl h-95 rounded-xl p-4 overflow-hidden">
                          <FullCalendar
                              plugins={[dayGridPlugin]}
                              initialView="dayGridMonth"
                              headerToolbar={false}
                              height="auto"
                              expandRows={true}
                              fixedWeekCount={false}
                          />
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default Dashboard
