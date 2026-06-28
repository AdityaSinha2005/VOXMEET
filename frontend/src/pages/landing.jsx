import React from 'react'
import "../App.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
   const router = useNavigate();
  return (
    <div className="LandingPageContainer">
        <nav>
          <div className='navHeader'>
             <h2>VoxMeet</h2>
          </div>
          <div className='navlist'>
             <p onClick={()=>{router("/aditya")}}>Join as Guest</p>
             <p onClick={()=>{router("/auth")}}>Register</p>
             <div role='Button' onClick={()=>{router("/auth")}}>
              <p>Login</p>
             </div>
          </div>
        </nav>

        <div className="landingMainContainer">
          <div >
            <h1><span style={{color:"#FF9839"}}>Connect</span> Instantly with the People Who Matter Most</h1>
            <p>Cover a distance by VoxMeet</p>
            <div className="getStartedBtn" role='button'>
              <Link to="/Auth" >Get Started</Link>
            </div>
          </div>
          <div>
            <img src="/mobile.png" alt="photo" />
          </div>
        </div>
    </div>
  )
}

