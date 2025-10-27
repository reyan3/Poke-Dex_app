// Import React hooks and components
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import Support from "./components/Support";

// Import dark/light mode icons
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

import { BsShuffle } from "react-icons/bs";

import { FaSearchengin } from "react-icons/fa";

import { AiTwotoneSound } from "react-icons/ai";

// Import routing tools from React Router
import { BrowserRouter, Routes, Route, href } from "react-router-dom";

// Import CSS file
import "./App.css";

// ---------------- HOME COMPONENT ----------------
function Home({
  Dark,
  Pkmnname,
  setPkmnname,
  Pkmndata,
  shuffleload,
  Error,
  fetchPkmn,
  shufflePkmn,
  runAudio,
  gettype,
}) {
  return (
    <div className={`container ${Dark ? "darkCont" : ""}`}>
      {/* Input section for searching Pokémon */}
      <div className="pkmn-inp">
        <input
          type="text"
          placeholder="Enter Pokemon Name"
          value={Pkmnname}
          // Update Pokémon name when typing
          onChange={(e) => setPkmnname(e.target.value.trim())}
          // If user presses Enter → fetch the Pokémon
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              fetchPkmn(Pkmnname);
            }
          }}
        />
        {/* Button to fetch Pokémon by name */}
        <button
          onClick={() => fetchPkmn(Pkmnname)}
          className={`${Dark ? "darkSubmit" : ""}`}
        >
          <span>Search</span>
          <span style={{ fontSize: "15px" }}>
            <FaSearchengin />
          </span>
        </button>
      </div>

      {/* Error Image (Shown if Pokémon not found) */}
      {Error && (
        <div className="error">
          <img
            src="/assets/imgpkmn2.png"
            alt="img"
            className={`${Dark ? "darkError" : ""}`}
          />
        </div>
      )}

      {/* Pokémon Data Display */}
      {Pkmndata && (
        <div className="pkmn-data">
          {/* Pokémon Name + ID */}
          <h2 className="pkmn-name">
            {Pkmndata.name.toUpperCase()}{" "}
            {Pkmndata.id < 10 ? "#0" + Pkmndata.id : "#" + Pkmndata.id}
          </h2>

          {/* Pokémon Image */}
          <div className="pkmn-img-cont">
            <img
              src={Pkmndata.image}
              className={`pkmn-image ${Dark ? "darkImage" : ""}`}
              alt={Pkmndata.name}
            />
          </div>

          {/* Pokémon Types */}
          <div className="pkmn-type">
            Types:{" "}
            <span
              className={`frst-type ${gettype(Pkmndata.types[0])} ${
                Dark ? "darkTypng" : ""
              }`}
            >
              {Pkmndata.types[0]}
            </span>
            {/* Show 2nd type if exists */}
            {Pkmndata.types[1] && (
              <span
                className={`scnd-type ${gettype(Pkmndata.types[1])} ${
                  Dark ? "darkTypng" : ""
                }`}
              >
                {Pkmndata.types[1]}
              </span>
            )}
          </div>

          {/* Pokémon Height & Weight */}
          <div className="pkmn-height">Height: {Pkmndata.height / 10} m</div>
          <div className="pkmn-weight">Weight: {Pkmndata.weight / 10} kg</div>

          {/* Pokémon Abilities */}
          <div className="pkmn-abilities" style={{ textAlign: "center" }}>
            Abilities: {Pkmndata.ability.join(", ")}
          </div>
          <div>Hidden-Ability: {Pkmndata.hidden}</div>

          <div className="pkmn-card-footer">
            {/* Pokémon Cry (Sound) Button */}
            {Pkmndata.audio && (
              <button className="pkmn-cry-shuffle" onClick={runAudio}>
                <span
                  style={{
                    display: "flex",
                    gap: "5px",
                    justifyContent: "center",
                  }}
                >
                  Play Cry
                  <AiTwotoneSound style={{ fontSize: "15px" }} />
                </span>
              </button>
            )}
            {/* New Shuffle Button */}
            <button
              onClick={shufflePkmn}
              disabled={shuffleload}
              className={`pkmn-cry-shuffle`}
            >
              Poké-Shuff
              <BsShuffle />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------- MAIN APP COMPONENT ----------------
function App() {
  // State variables
  const [Pkmnname, setPkmnname] = useState("pikachu"); // Default Pokémon
  const [Pkmndata, setPkmndata] = useState(); // Stores fetched Pokémon data
  const [Loading, setLoading] = useState(false); // Loading state
  const [shuffleload, setShuffleload] = useState(false);
  const [Error, setError] = useState(null); // Error state
  const [Dark, setDark] = useState(false); // Dark/Light mode state

  // Reference for Pokémon audio
  const audioRef = useRef();

  // Apply dark mode class to <body>
  useEffect(() => {
    if (Dark) {
      document.body.classList.add("darkOn");
    } else {
      document.body.classList.remove("darkOn");
    }
  }, [Dark]);

  // Fetch Pokémon Data from API
  const fetchPkmn = async (name, isShuffle = false) => {
    try {
      if (isShuffle) {
        setShuffleload(true);
      } else {
        setLoading(true);
      }
      setError(null);

      // Fetch data from PokéAPI
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      const data = await res.json();

      // Choose best available Pokémon image
      const image =
        data.sprites.other["dream_world"].front_default ||
        data.sprites.other["official-artwork"].front_default ||
        data.sprites.front_default;

      // Save Pokémon data in state
      setPkmndata({
        name: data.name,
        id: data.id,
        types: data.types.map((t) => t.type.name),
        image: image,
        height: data.height,
        weight: data.weight,
        ability: data.abilities.map((a) => a.ability.name),
        hidden: data.abilities.find((s) => s.is_hidden)
          ? data.abilities.find((s) => s.is_hidden).ability.name
          : "None",
        audio: data.cries.latest,
      });

      // Save Pokémon cry audio
      audioRef.current = new Audio(data.cries.latest);
    } catch (err) {
      // If Pokémon not found
      setError("Pokémon Not Found");
      setPkmndata(null);
    } finally {
      setLoading(false);
      setShuffleload(false);
    }
  };

  // Shuffle Pokémon (fetch random Pokémon by ID)
  const shufflePkmn = () => {
    const randomId = Math.floor(Math.random() * 1025) + 1; // There are about 1025 Pokémon
    fetchPkmn(randomId.toString(), true); // Convert ID to string before fetching
  };

  // Play Pokémon cry (reset to start each time)
  function runAudio() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }

  // Pokémon type mapping for styling
  const pkmn_types = {
    fire: "fire",
    water: "water",
    electric: "electric",
    psychic: "psychic",
    ground: "ground",
    grass: "grass",
    fighting: "fighting",
    rock: "rock",
    dark: "dark",
    poison: "poison",
    dragon: "dragon",
    ghost: "ghost",
    fairy: "fairy",
    flying: "flying",
    normal: "normal",
    bug: "bug",
    ice: "ice",
    steel: "steel",
  };

  // Get type CSS class
  const gettype = (type) => pkmn_types[type] || "";

  // Run only once when app starts → load default Pokémon
  useEffect(() => {
    fetchPkmn(Pkmnname);
  }, []);

  // Toggle dark/light mode button
  const darkToggleElement = Dark ? (
    <div className="darklight-btn" onClick={() => setDark(!Dark)}>
      <MdOutlineLightMode />
    </div>
  ) : (
    <div className="darklight-btn" onClick={() => setDark(!Dark)}>
      <MdDarkMode />
    </div>
  );

  return (
    <BrowserRouter>
      {/* Navbar with dark mode button */}
      <Navbar darkmode={darkToggleElement} sliderContainer={Dark} />

      {/* Routes for pages */}
      <Routes>
        {/* Home (Pokémon Search Page) */}
        <Route
          path="/"
          element={
            <Home
              Dark={Dark}
              setDark={setDark}
              Pkmnname={Pkmnname}
              setPkmnname={setPkmnname}
              Pkmndata={Pkmndata}
              Loading={Loading}
              shuffleload={shuffleload}
              Error={Error}
              fetchPkmn={fetchPkmn}
              shufflePkmn={shufflePkmn}
              runAudio={runAudio}
              gettype={gettype}
              // (No need to pass setPkmndata/setLoading here, fetchPkmn already handles it)
            />
          }
        />
        {/* About Page */}
        <Route path="/about" element={<About darkmode={Dark} />} />
        {/* Support Page */}
        <Route path="/support" element={<Support darkmode={Dark} />} />
      </Routes>

      {/* Footer */}
      <Footer />

      {/* Loading Animation */}
      {Loading && (
        <div className="loading">
          <img src="/assets/loadgif2.gif" alt="img" className="loading-img" />
        </div>
      )}

      {shuffleload &&
        <div className="shuffleload loading">
          <img
            src="/assets/shuffleload.gif"
            alt="shuffle"
            className="shuffleload-img"
          />
        </div>
      }
    </BrowserRouter>
  );
}

export default App;
