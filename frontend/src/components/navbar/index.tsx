import { Link } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
  return (
    <div className="nav-container">
      <Link to="/" className="nav-logo-text">
        <h2>Movie Flix</h2>
      </Link>

      <button className="btn-navbar">SAIR</button>
    </div>
  );
};

export default Navbar;
