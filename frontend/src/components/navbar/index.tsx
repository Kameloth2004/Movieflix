import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import history from "../../util/history";
import { getTokenData, isAuthenticated, removeAuthData, TokenData } from "../../util/requests";
import "./styles.css";

type AuthData = {
  authenticated: boolean;
  tokenData?: TokenData;
};

const Navbar = () => {
  const [authData, setAuthData] = useState<AuthData>({ authenticated: false });

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthData({
        authenticated: false,
      });
    }
  }, []);

  const handleClick = (event:React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthData({
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
      {authData.authenticated && (
      
      
      <a href="#logout" onClick={handleClick} className="btn-logout">SAIR</a>
      
      )}

      
      </div>
    </div>
  );
};

export default Navbar;
