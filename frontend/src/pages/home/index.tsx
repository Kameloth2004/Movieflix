import { ReactComponent as MainImage } from "../../assets/images/mainimage.svg";
import Login from "../../components/Login";
import { isAuthenticated } from "../../util/requests";

import "./styles.css";

const Home = () => {
  return (
    <div className="main-container">
      <h1>{isAuthenticated() ? 'autenticado' : 'NÃO autenticado'}</h1>
      <div className="home-container">
        <h1>Avalie Filmes</h1>
        <p>Diga o que você achou de seu filme favorito</p>
        <div className="image-container"></div>
        <MainImage />
      </div>
      <div className="login-container">
        <Login />
      </div>
    </div>
  );
};
export default Home;
