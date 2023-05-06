import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext";
import {
  getTokenData,
  isAuthenticated,
  removeAuthData,
} from "../../util/requests";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);
  const [showBackButton, setShowBackButton] = useState(false);
  const location = useLocation();
  const history = useHistory();

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

  useEffect(() => {
    // Atualize o valor de 'showBackButton' com base na rota atual
    setShowBackButton(location.pathname.includes("/movies/"));
  }, [location.pathname]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });

    history.replace("/");
  };

  const handleBackButtonClick = () => {
    history.goBack();
  };

  return (
    <div className="nav-container">
      <Link to="/" className="nav-logo-text">
        <h2>Movie Flix</h2>
      </Link>
      {showBackButton && (
        <button className="btn-back" onClick={handleBackButtonClick}>
          Voltar
        </button>
      )}
      {authContextData.authenticated && (
        <div className="nav-login">
          <Link to="/" onClick={handleClick} className="btn-logout">
            SAIR
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
