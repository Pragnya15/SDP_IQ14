import React from 'react';
import './App.css';
import { GiArchiveResearch } from "react-icons/gi";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState,useEffect } from 'react';
import Home from './Home';
import Prediction from './Prediction';
import ReviewsPage from './ReviewsPage';

function App() {
  const [value,setValue] = useState("Home")

  useEffect(()=>{

  },[value])

  const PageDisplay = () =>{
    if(value==="Home"){
      return <Home></Home>
    }
    else if(value==="Check"){
      return <Prediction></Prediction>
    }
    else if(value==="Existing"){
      return <ReviewsPage></ReviewsPage>
    }
  }
  return (
    <>
    <div className='wrapper-div'>
    <div className='navbar'>
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home"><GiArchiveResearch  />Find IT</Navbar.Brand>
          <Nav className="me-auto nav-div">
            <Nav.Link onClick={()=>setValue("Home")}>Home</Nav.Link>
            <Nav.Link onClick={()=>setValue("Check")}>Check Review</Nav.Link>
            <Nav.Link  onClick={()=>setValue("Existing")}>Existing Reviews</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </div>
    <div>
    {PageDisplay()}
    </div>
    </div>
    
    </>
   
  );
}

export default App;
