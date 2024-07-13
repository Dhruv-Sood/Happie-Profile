import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';  // Adjust the import path based on your project structure
import Navbar from "../components/Navbar";
import './Form.css';
import { Link } from 'react-router-dom';

const Form = () => {
    const [formData, setFormData] = useState({
        linkedin: '',
        username: '',
        role: '',
        blogLink: '',
        search: '',
        projects: [
            {
                projectName: '',
                projectDesc: '',
                projectImgLink: '',
                projectLink: ''
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
            setFormData({ ...formData, [name]: value });
        }
    };

    const addProject = () => {
        setFormData({
            ...formData,
            projects: [...formData.projects, { projectName: '', projectDesc: '', projectImgLink: '', projectLink: '' }]
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

        const areAllProjectsFilled = formData.projects.every(project =>
            project.projectName && project.projectDesc && project.projectImgLink && project.projectLink
        );

        const areAllBlogsFilled = formData.blogs.every(blog =>
            blog.blogTitle && blog.blogImageUrl && blog.blogLink
        );

        if (!formData.linkedin || !formData.username || !formData.role || !areAllProjectsFilled || !areAllBlogsFilled) {
            alert('Please fill out all fields.');
            return;
        }

        try {
            await addDoc(collection(db, "users"), {
                linkedin: formData.linkedin,
                username: formData.username,
                role: formData.role,
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
        <div data-theme="halloween" className=''>
            <Navbar />
            <div className="flex items-center justify-center p-4" >
                <form className="p-8 rounded-lg shadow-lg w-full max-w-2xl" >
                    <h1 className="text-2xl font-bold mb-6 text-center">Create Your Portfolio</h1>

                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="font-semibold">LinkedIn Profile URL</label>
                            <input
                                
                                type="text"
                                name="linkedin"
                                className="p-2 border rounded"
                                placeholder="LinkedIn Profile URL"
                                value={formData.linkedin}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold">Username</label>
                            <input
                                type="text"
                                name="username"
                                className="p-2 border rounded"
                                placeholder="Username"
                                value={formData.username}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold">Role</label>
                            <input
                                type="text"
                                name="role"
                                className="p-2 border rounded"
                                placeholder="Role (e.g., Frontend Developer)"
                                value={formData.role}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-2">Projects</h2>
                        <div className="space-y-4 overflow-y-scroll max-h-60">
                            {formData.projects.map((project, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex flex-col">
                                        <label className="font-semibold">Project Name</label>
                                        <input
                                            type="text"
                                            name="projectName"
                                            className="p-2 border rounded"
                                            placeholder="Project Name"
                                            value={project.projectName}
                                            onChange={(e) => handleChange(e, index, 'projects')}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-semibold">Project Description</label>
                                        <input
                                            type="text"
                                            name="projectDesc"
                                            className="p-2 border rounded"
                                            placeholder="Project Description"
                                            value={project.projectDesc}
                                            onChange={(e) => handleChange(e, index, 'projects')}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-semibold">Project Image Link</label>
                                        <input
                                            type="text"
                                            name="projectImgLink"
                                            className="p-2 border rounded"
                                            placeholder="Project Image Link"
                                            value={project.projectImgLink}
                                            onChange={(e) => handleChange(e, index, 'projects')}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-semibold">Project Link</label>
                                        <input
                                            type="text"
                                            name="projectLink"
                                            className="p-2 border rounded"
                                            placeholder="Project Link"
                                            value={project.projectLink}
                                            onChange={(e) => handleChange(e, index, 'projects')}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="mt-4 btn btn-primary" onClick={addProject}>
                            Add More Project(s)
                        </button>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-2">Blogs</h2>
                        <div className="space-y-4 overflow-y-scroll max-h-60">
                            {formData.blogs.map((blog, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex flex-col">
                                        <label className="font-semibold">Blog Title</label>
                                        <input
                                            type="text"
                                            name="blogTitle"
                                            className="p-2 border rounded"
                                            placeholder="Blog Title"
                                            value={blog.blogTitle}
                                            onChange={(e) => handleChange(e, index, 'blogs')}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-semibold">Blog Image URL</label>
                                        <input
                                            type="text"
                                            name="blogImageUrl"
                                            className="p-2 border rounded"
                                            placeholder="Blog Thumbnail Url"
                                            value={blog.blogImageUrl}
                                            onChange={(e) => handleChange(e, index, 'blogs')}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-semibold">Blog Link</label>
                                        <input
                                            type="text"
                                            name="blogLink"
                                            className="p-2 border rounded"
                                            placeholder="Blog Link"
                                            value={blog.blogLink}
                                            onChange={(e) => handleChange(e, index, 'blogs')}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="mt-4 btn btn-secondary" onClick={addBlog}>
                            Add More Blog(s)
                        </button>
                    </div>

                    <button type="submit" className="mt-6 btn btn-accent w-full" onClick={handleSubmit}>
                        Submit
                    </button>

                    {showPopup && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-5 rounded shadow-lg text-center">
                                <p className="text-green-600 mb-4">Form submitted successfully!</p>
                               <div className='w-full flex gap-4 justify-between'>
                                    <button className="btn" onClick={handleClosePopup}>Close</button>
                                    <Link to={`/portfolio/${formData.username}`}><button className="btn btn-accent">Open Portfolio</button></Link>
                               </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Form;
