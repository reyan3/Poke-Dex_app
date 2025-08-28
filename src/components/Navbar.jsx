import { useState } from 'react';
import "./Navbar.css";

// React Icons
import { GiHamburgerMenu } from "react-icons/gi"; // Hamburger (menu icon)
import { AiOutlineClose } from "react-icons/ai";   // Close (X icon)

// React Router (for page navigation)
import { Link } from 'react-router-dom';

const Navbar = (props) => {

  // ---------------- STATE ----------------
  // Stores whether the slider menu is open or not
  const [issliderOpen, setissliderOpen] = useState(false);

  // Function to toggle the slider open/close
  const isopenSlider = () => setissliderOpen(!issliderOpen);

  return (
    <div className='Nav-container'>
      
      {/* HAMBURGER ICON (visible on small screens) */}
      <div
        className={`hamburger ${props.sliderContainer ? "Sliderwhite" : ""}`}
        onClick={isopenSlider}
      >
        <GiHamburgerMenu />
      </div>
      
      {/* SLIDER MENU (side navigation) */}
      <div
        className={`slider ${issliderOpen ? "openSlider" : ""} ${props.sliderContainer ? "Sliderwhite" : ""}`}
      >
        <div className="SliderContainer">
          
          {/* EXIT BUTTON (close slider) */}
          <span className='exit' onClick={isopenSlider}>
            <AiOutlineClose size={20}/>
          </span>

          {/* SLIDER NAVIGATION LINKS */}
          <ul>
            <Link to="/" className='links'>
              <li className={`${props.sliderContainer ? "Sliderwhite" : ""}`}>Home</li>
            </Link>
            <Link to="/about" className='links'>
              <li className={`${props.sliderContainer ? "Sliderwhite" : ""}`}>About</li>
            </Link>
            <Link to="/support" className='links'>
              <li className={`${props.sliderContainer ? "Sliderwhite" : ""}`}>Support</li>
            </Link>
          </ul>

          {/* DARK MODE TOGGLE BUTTON (passed from App.js) */}
          {props.darkmode}
        </div>
      </div>

      {/* LOGO + APP NAME */}
      <div className="Name">
        <img src="./public/assets/pkmnsvg.svg" alt="pkmn" style={{ width: "20px" }} />
        <span>Pok-é-Dex</span>
      </div>

      {/* NORMAL NAVBAR LINKS (visible on large screens) */}
      <div className="components">
        <ul>
          <Link to="/" className='links'><li>Home</li></Link>
          <Link to="/about" className='links'><li>About</li></Link>
          <Link to="/support" className='links'><li>Support</li></Link>
        </ul>

        {/* Dark mode toggle (same as in slider) */}
        {props.darkmode}
      </div>
    </div>
  );
}

export default Navbar;
