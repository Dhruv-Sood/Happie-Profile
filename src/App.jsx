import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Form from './pages/Form'
import Portfolio from './pages/Portfolio'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {


  return (
    // <>
    //   {/* <Home /> */}
    //  <Form /> 
    //   {/* <Portfolio /> */}
    // </>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/portfolio/:userName" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
