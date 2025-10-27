import "./About.css";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";

const About = (props) => {
  return (
    <div className={`about-container ${props.darkmode ? "darkabout" : ""}`}>
      <h1 className="about-title">About Pok-é-Dex</h1>
      <p className="about-text">
        Welcome to <span className="highlight">Pok-é-Dex</span>!   
        This app lets you search and explore your favorite Pokémon, 
        check their types, abilities and many more.
      </p>

      <p className="about-text">
        Whether you’re a casual fan or a Pokédex master, this app 
        makes it simple and fun to discover the Pokémon world. 
      </p>

      <div className="about-features">
        <h2>Features <MdOutlineScreenSearchDesktop style={{marginTop:"5px"}}/></h2>
        <ul>
          <li>🔍 Search for Pokémon by name</li>
          <li>📏 Height and Width</li>
          <li>⚡ Check types and abilities</li>
          <li>🔊 Pokémon Cries</li>
          <li>🌙 Toggle dark & light mode</li>
        </ul>
      </div>

      <p className="about-footer">
        Built with ❤️ using React + <a href="https://pokeapi.co/">PokéAPI</a>.
      </p>
    </div>
  );
};

export default About;
