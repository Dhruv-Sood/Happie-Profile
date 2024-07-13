import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"
import { useState } from "react"
const Home = () => {

    const [userName, setUserName] = useState("")
    const handleUserName = (e) => {
        setUserName(e.target.value)
    }
    return (
        <>
        <Navbar />
        <div className="h-[calc(100vh-67px)] w-full flex justify-center items-center gap-4 flex-col">
            <div className="flex gap-2">
                    <input type="text" placeholder="Search Portfolio" onChange={handleUserName}/>
                    <Link to={`/portfolio/${userName}`}>
                        <button>Go</button>
                    </Link>
            </div>
                <Link to={"/form"}><button>Create One</button></Link>
        </div>
        </>
    )
}
export default Home