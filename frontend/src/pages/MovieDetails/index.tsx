import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestBackend } from "../../util/requests";
import { AxiosRequestConfig } from "axios";
import { MovieData } from "../../types/moviedata";
import "./styles.css";

type UrlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();
  const [movie, setMovie] = useState<MovieData>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: `/movies/${movieId}`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => {
        setMovie(response.data);
        console.log("Detalhes do filme:", response.data);
      })
      .catch(() => {
        console.log("Erro ao carregar detalhes do filme.");
      });
  }, [movieId]);

  return (
    <div className="movie-container">
      <div className="movie-details-container">
        {movie ? (
          <div className="movie-details">
            <div className="movie-card">
              <div className="movie-card-image">
                <img src={movie.imgUrl} alt={movie.title} />
              </div>
              <div className="movie-info-container">
                <div className="movie-info">
                  <h1>{movie.title}</h1>
                  <p>Ano: {movie.year}</p>
                  <h2>{movie.subTitle}</h2>
                </div>
              

              <div className="movie-synopsis">
                <span>{movie.synopsis}</span>
              </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
};
export default MovieDetails;
