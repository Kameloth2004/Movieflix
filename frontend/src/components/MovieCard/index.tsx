import { MovieData } from "../../types/moviedata";
import "./styles.css";

type Props = {
  movie: MovieData;
};

function MovieCard({ movie }: Props) {
  return (
    
    <div className="dsmovie-card">
      <img
        className="dsmovie-movie-card-image"
        src={movie.imgUrl}
        alt={movie.title}
      />
      <div className="dsmovie-card-bottom-container">
        <h3 className="dsmovie-card-title text-white">{movie.title}</h3>
        <h4 className="dsmovie-card-year text-warning">{movie.year}</h4>
        <p className="dsmovie-card-subTitle text-white">{movie.subTitle}</p>
        <h3>{movie.synopsis}</h3>
      </div>
    </div>
  );
}

export default MovieCard;
