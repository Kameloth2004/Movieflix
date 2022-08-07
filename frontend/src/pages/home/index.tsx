import { ReactComponent as MainImage } from '../../assets/images/mainimage.svg';
import Navbar from '../../components/navbar';
import './styles.css';


const Home = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="home-container">
          <h1>Avalie Filmes</h1>
          <p>Diga o que você achou de seu filme favorito</p>
          <div className='image-container'>
          </div>
          <MainImage />
        </div>
        <div className='login-container'>
          <h2>LOGIN</h2>
          <div className="form-container">
            <form action="email">
            <div className='mb-4'>
              <input type="Email" 
              placeholder='Email'
              />
            </div>
            <div className='mb-2'>
              <input type="senha" 
              placeholder='Senha'
              />
            </div>
            </form>
            
          </div>
          <button className='btn'>Fazer Login</button>
        </div>
      </div>
    </>
  );
};
export default Home;


