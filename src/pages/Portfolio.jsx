import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Blogs from "../components/Blogs";

import { useParams } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from '../firebase'; 

const Portfolio = () => {
    const { userName } = useParams();
    const [userID, setUserID] = useState("");
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                const foundUser = data.find(user => user.username === userName);
                if (foundUser) {
                    setUserData(foundUser);
                    setUserID(foundUser.id); // Set userID here
                } else {
                    console.error("User not found");
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false); // Ensure loading is set to false here
            }
        };

        fetchData();

    }, [userName]);

    useEffect(() => {
        if (Object.keys(userData).length > 0) {
            setProjects(userData.projects);
            setBlogs(userData.blogs);
        }
    }, [userData]);

    return (
        <>
            {loading ? (
                <div className="h-screen w-full flex justify-center items-center">
                    <h1>Loading...</h1>
                </div>
            ) : (
                <div>
                    <Navbar />
                    <Hero name={userName} role={userData.role}/>
                    <Projects sectionTitle={"Projects"} data={projects} />
                    <Blogs bg={"bg-base-200"} data={blogs} />
                    <Footer />
                </div>
            )}
        </>
    );
};

export default Portfolio;
