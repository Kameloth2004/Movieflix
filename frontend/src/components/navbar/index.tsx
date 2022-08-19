import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import history from "../../util/history";
import { getTokenData, isAuthenticated, removeAuthData } from "../../util/requests";
import "./styles.css";



const Navbar = () => {
  
  const { authContextData, setAuthContextData } = useContext(AuthContext);
  
  

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleClick = (event:React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });

    history.replace('/');

  }

  return (
    <div className="nav-container">
      <Link to="/" className="nav-logo-text">
        <h2>Movie Flix</h2>
      </Link>
      <div>
      {authContextData.authenticated && (
      
      
      <a href="#logout" onClick={handleClick} className="btn-logout">SAIR</a>
      
      )}

      
      </div>
    </div>
  );
};

export default Navbar;
