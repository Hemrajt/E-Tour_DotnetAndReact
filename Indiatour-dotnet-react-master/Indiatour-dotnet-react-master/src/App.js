
import './App.css';
import React, { Component }  from 'react';
import { Routes, Route } from "react-router-dom";
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import NoPage from './Pages/NoPage';
import About from './Pages/About';
import Gallery from './Pages/Gallery';
import Main from './Iternary/Main';
import Booknow from './Iternary/Booknow';
import SubSector from './SubComponent/SubSector';
import Sector from './Components/Sector';
import PDFview from './Iternary/PDFview';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Admin from './Components/Admin';


function App() {
  return (
    <>     
     <Header/>
      <Routes>
         <Route exact path="/" element={<Home />} />
          <Route path="/:Id" element={<Sector />} />
          <Route exact path="/profile" element={<Profile/>} />
          <Route exact path="/Admin" element={<Admin/>} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:Id/:Sid" element={<SubSector />} />
          <Route path="/Details/:SSid" element={<Main />} />
          <Route path="/book/:bkid/:smid/:cid" element={<Booknow />} />
          <Route path="/view/:bkid/:smid/:cid/" element={<PDFview />} />
          <Route path="About" element={<About />} />
          <Route path="Gallery" element={<Gallery />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
