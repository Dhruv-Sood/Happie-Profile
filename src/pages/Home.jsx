import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

    const handleUserName = (e) => {
        setUserName(e.target.value);
    };

    const handleGo = () => {
        if (userName === "") {
            alert("Please enter a username");
        } else {
            navigate(`/portfolio/${userName}`);
        }
    }

    const handleKeyDown = (event) => {
        if(event.key == 'Enter') {
            handleGo();
        }
    }

    return (
        <div className=" imgbg">
            <Navbar />

            <div className="h-[calc(100vh-67px)] w-full flex justify-center items-center flex-col p-4">
                
                <div className="bg-white p-6 sm:p-8 rounded shadow-lg flex flex-col items-center gap-4 w-full max-w-md">
                    <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Search or Create a Portfolio</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center w-full">
                        <input
                            type="text"
                            placeholder="Search Portfolio"
                            className="p-2 border rounded w-full"
                            onChange={handleUserName}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
                            onClick={handleGo}
                        >
                            Go
                        </button>
                    </div>
                    <Link to="/form" className="w-full">
                        <button className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-green-600 transition">
                            Create One
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
