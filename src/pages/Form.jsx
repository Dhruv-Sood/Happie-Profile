import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';  // Adjust the import path based on your project structure
import Navbar from "../components/Navbar";

const Form = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    projectName: '',
    projectDesc: '',
    projectImgLink: '',
    blogLink: '',
    search: ''
  });
  const [showPopup, setShowPopup] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [emailError, setEmailError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if all fields are filled
    for (let key in formData) {
      if (!formData[key] && key !== 'search') {
        alert('Please fill out all fields.');
        return;
      }
    }

    try {
      // Add a new document with a generated ID
      await addDoc(collection(db, "users"), {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        projectName: formData.projectName,
        projectDesc: formData.projectDesc,
        projectImgLink: formData.projectImgLink,
        blogLink: formData.blogLink
      });
      setShowPopup(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleSearch = async (event) => {
    const searchValue = event.target.value;
    setFormData({ ...formData, search: searchValue });

    if (searchValue) {
      const q = query(collection(db, "users"), where("username", "==", searchValue));

      try {
        const querySnapshot = await getDocs(q);
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setSearchResults(results);
      } catch (e) {
        console.error("Error searching documents: ", e);
      }
    } else {
      setSearchResults(null);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCloseSearchResults = () => {
    setSearchResults(null);
  };

  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-67px)]">
        <div className="flex justify-center items-center w-full h-full flex flex-col">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="search"
              className="grow"
              placeholder="Search"
              value={formData.search}
              onChange={handleSearch}
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
              />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
              />
            </svg>
            <input
              type="text"
              name="email"
              className="grow"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          {/* Display the email error message */}
          {emailError && (
            <p className="text-red-500">{emailError}</p>
          )}
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
              />
            </svg>
            <input
              type="text"
              name="username"
              className="grow"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password"
              className="grow"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path
                d="M5.5 2a.5.5 0 0 1 .5.5V4h7V2.5a.5.5 0 0 1 1 0V4h.5a.5.5 0 0 1 .5.5V8h-11V4.5a.5.5 0 0 1 .5-.5H5V2.5a.5.5 0 0 1 .5-.5Z"
              />
              <path
                fillRule="evenodd"
                d="M1 8.5A.5.5 0 0 1 1.5 8h13a.5.5 0 0 1 .5.5V12a1.5 1.5 0 0 1-1.5 1.5H11v1a.5.5 0 0 1-.757.429L8 13.485l-2.243 1.444A.5.5 0 0 1 5 14.5v-1H2.5A1.5 1.5 0 0 1 1 12V8.5ZM2 9v3a.5.5 0 0 0 .5.5H5v-1a.5.5 0 0 1 .757-.429L8 12.515l2.243-1.444A.5.5 0 0 1 11 11v1h2.5a.5.5 0 0 0 .5-.5V9H2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              name="projectName"
              className="grow"
              placeholder="Project Name"
              value={formData.projectName}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M3 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3Zm3.69 3.31a1 1 0 1 0-1.38 1.45L7.26 8.75 5.31 10.69a1 1 0 1 0 1.45 1.38L8.75 10.74l1.94 1.93a1 1 0 1 0 1.38-1.45L10.24 8.75l1.93-1.94a1 1 0 1 0-1.45-1.38L8.75 7.26 6.81 5.31Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              name="projectDesc"
              className="grow"
              placeholder="Project Description"
              value={formData.projectDesc}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M4.75 1A1.75 1.75 0 0 0 3 2.75v10.5C3 14.216 3.784 15 4.75 15h6.5A1.75 1.75 0 0 0 13 13.25V2.75C13 1.784 12.216 1 11.25 1h-6.5Zm.5 1.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0ZM5 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5A.5.5 0 0 1 5 5.5Zm.5 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5ZM5 10.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              name="projectImgLink"
              className="grow"
              placeholder="Project Image Link"
              value={formData.projectImgLink}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM4.75 8a.75.75 0 0 1 .75-.75H7V5.5a.5.5 0 0 1 1 0V7h1.5a.75.75 0 0 1 0 1.5H8v1.5a.5.5 0 0 1-1 0V8H5.5a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              name="blogLink"
              className="grow"
              placeholder="Blog Link"
              value={formData.blogLink}
              onChange={handleChange}
            />
          </label>
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
        {searchResults && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded shadow-lg text-center">
              {searchResults.map((result) => (
                <div key={result.id} className="mb-4">
                  <p>{result.username}</p>
                  <p>{result.email}</p>
                </div>
              ))}
              <button className="btn" onClick={handleCloseSearchResults}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Form;