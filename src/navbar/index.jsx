import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./style.css"
export default function Navbar() {
  const currentTitle = {
    '/broadcasting': 'Broadcasting',
    '/comitive': 'Comitive',
    '/contatti': 'Proclamatori',
    '/': 'GESTIONALE SAVA 2',
  }
  const navigate = useNavigate();
  const goTo = (path) => {
    navigate(path);
  };
  return (
    <div>
      <header>
        <h1>{currentTitle[window.location.pathname]}</h1>
      </header>
      <nav>
        <span className="clickable" onClick={()=>{goTo("/")}}>Home</span>
        <span className="clickable" onClick={()=>{goTo("/broadcasting")}}>Broadcasting</span>
        <span className="clickable" onClick={()=>{goTo("/comitive")}}>Comitive</span>
        <span className="clickable" onClick={()=>{goTo("/contatti")}}>Proclamatori</span>
      </nav>
    </div>
  )
}
