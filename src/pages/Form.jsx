import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';  // Adjust the import path based on your project structure
import Navbar from "../components/Navbar";
import './Form.css';

const Form = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        role: '', // Add role field
        blogLink: '',
        search: '',
        projects: [
            {
                projectName: '',
                projectDesc: '',
                projectImgLink: ''
            }
        ],
        blogs: [
            {
                blogTitle: '',
                blogImageUrl: '',
                blogLink: ''
            }
        ]
    });

    const [showPopup, setShowPopup] = useState(false);
    const [emailError, setEmailError] = useState('');

    const handleChange = (event, index = null, type = null) => {
        const { name, value } = event.target;

        if (type === 'projects') {
            const projects = [...formData.projects];
            projects[index] = { ...projects[index], [name]: value };
            setFormData({ ...formData, projects });
        } else if (type === 'blogs') {
            const blogs = [...formData.blogs];
            blogs[index] = { ...blogs[index], [name]: value };
            setFormData({ ...formData, blogs });
        } else {
            if (name === 'email') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(value)) {
                    setEmailError('Please enter a valid email address');
                } else {
                    setEmailError('');
                }
            }
            setFormData({ ...formData, [name]: value });
        }
    };

    const addProject = () => {
        setFormData({
            ...formData,
            projects: [...formData.projects, { projectName: '', projectDesc: '', projectImgLink: '' }]
        });
    };

    const addBlog = () => {
        setFormData({
            ...formData,
            blogs: [...formData.blogs, { blogTitle: '', blogImageUrl: '', blogLink: '' }]
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if all fields are filled
        const areAllProjectsFilled = formData.projects.every(project =>
            project.projectName && project.projectDesc && project.projectImgLink
        );

        const areAllBlogsFilled = formData.blogs.every(blog =>
            blog.blogTitle && blog.blogImageUrl && blog.blogLink
        );

        if (!formData.email || !formData.username || !areAllProjectsFilled || !areAllBlogsFilled) {
            alert('Please fill out all fields.');
            return;
        }

        try {
            await addDoc(collection(db, "users"), {
                email: formData.email,
                username: formData.username,
                role: formData.role, // Include role here
                projects: formData.projects,
                blogs: formData.blogs
            });
            setShowPopup(true);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    };


    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <Navbar />
            <div className="h-[calc(100vh-67px)]">
                <div className="flex justify-center items-center w-full h-full flex-col gap-4">

                    <div className="user-details">
                        <label className="input input-bordered flex items-center">
                            <input
                                type="text"
                                name="email"
                                className="grow"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                        {/* Display the email error message */}
                        {emailError && (
                            <p className="text-red-500">{emailError}</p>
                        )}
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="text"
                                name="username"
                                className="grow"
                                placeholder="Username"
                                value={formData.username}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="text"
                                name="role"
                                className="grow"
                                placeholder="Role (e.g., Frontend Developer)"
                                value={formData.role}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                        
                    </div>

                    <div className="project-details flex flex-col gap-4  h-[230px]">
                        <div className='projects overflow-y-scroll flex flex-col gap-4'>
                            {formData.projects.map((project, index) => (
                                <div key={index}>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <input
                                            type="text"
                                            name="projectName"
                                            className="grow"
                                            placeholder="Project Name"
                                            value={project.projectName}
                                            onChange={(e) => handleChange(e, index, 'projects')}
                                        />
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <input
                                            type="text"
                                            name="projectDesc"
                                            className="grow"
                                            placeholder="Project Description"
                                            value={project.projectDesc}
                                            onChange={(e) => handleChange(e, index, 'projects')}
                                        />
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <input
                                            type="text"
                                            name="projectImgLink"
                                            className="grow"
                                            placeholder="Project Image Link"
                                            value={project.projectImgLink}
                                            onChange={(e) => handleChange(e, index, 'projects')}
                                        />
                                    </label>
                                </div>
                            ))}
                        </div>
                        <button className="btn" onClick={addProject}>Add Project</button>
                    </div>

                    <div className="blogs-detail flex flex-col gap-4 h-[230px]">
                        <div className='blogs overflow-y-scroll flex flex-col gap-4'>
                            {formData.blogs.map((blog, index) => (
                                <div key={index}>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <input
                                            type="text"
                                            name="blogTitle"
                                            className="grow"
                                            placeholder="Blog Title"
                                            value={blog.blogTitle}
                                            onChange={(e) => handleChange(e, index, 'blogs')}
                                        />
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <input
                                            type="text"
                                            name="blogImageUrl"
                                            className="grow"
                                            placeholder="Blog Image URL"
                                            value={blog.blogImageUrl}
                                            onChange={(e) => handleChange(e, index, 'blogs')}
                                        />
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <input
                                            type="text"
                                            name="blogLink"
                                            className="grow"
                                            placeholder="Blog Link"
                                            value={blog.blogLink}
                                            onChange={(e) => handleChange(e, index, 'blogs')}
                                        />
                                    </label>
                                </div>
                            ))}
                        </div>
                        
                        <button className="btn" onClick={addBlog}>Add Blog</button>
                    </div>

                    <button className="btn" onClick={handleSubmit}>Submit</button>
                </div>

                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-5 rounded shadow-lg text-center">
                            <p className="text-green-600 mb-4">Form submitted successfully!</p>
                            <button className="btn" onClick={handleClosePopup}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Form;
