import Navbar from "../components/Navbar"; import React, { useState } from 'react'; const Form = () => { const [formData, setFormData] = useState({ username: '', email: '', mobile: '', projectName: '', projectDescription: '', projectImageUrl: '' }); const handleChange = (e) => { const { name, value } = e.target; setFormData({ ...formData, [name]: value }); }; const handleSubmit = (e) => { e.preventDefault(); console.log('Form submitted:', formData); // Add your form submission logic here }; return ( <> <Navbar /> <div className="h-[calc(100vh-67px)]"> <div className="flex justify-center items-center w-full h-full flex flex-col"> <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md p-4"> <label className="input input-bordered flex items-center gap-2"> <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="grow" required /> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70"> <path d="M8 8a3 3 0 1 0 0-6 3 3 0
