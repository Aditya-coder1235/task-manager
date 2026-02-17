import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router";
import { BookCheck } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { Settings } from "lucide-react";
import { CircleUserRound } from "lucide-react";


const User = () => {
  const navigate=useNavigate()
    let id = localStorage.getItem("userId");

    const [user, setUser] = useState(null);

    const fetchuser = async () => {
        try {
            let res = await axios.get(`http://localhost:5000/api/user/${id}`);
            // console.log(res.data)
            setUser(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchuser();
    }, []);

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
                </nav>
            </div>
            <div className="min-h-[60vh] w-full flex items-center justify-center bg-gray-200">
                {user ? (
                    <div className="bg-white shadow-2xl  rounded-2xl w-50 p-5 md:p-10 md:w-[320px] text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-2xl font-bold">
                            {user.name.charAt(0).toUpperCase()}
                        </div>

                        <h1 className="text-lg font-semibold text-purple-700">
                            {user.name}
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            {user.email}
                        </p>

                        <div className="mt-6 h-px bg-gray-200" />
                    </div>
                ) : (
                    <div className="text-gray-500 text-sm">
                        User not found. Please login first.
                    </div>
                )}
            </div>
        </div>
    );
};

export default User;
