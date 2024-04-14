import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';

const App = () => { 
  return(
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/auth" exact element={<Auth/>} />
        </Routes>
        {/* <Home /> */}
      </Container>
    </BrowserRouter>
  );
}
export default App;