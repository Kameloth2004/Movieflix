import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestBackend } from "../../util/requests";
import { AxiosRequestConfig } from "axios";
import { MovieData } from "../../types/moviedata";

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
    <div>
      {movie ? (
        <div className="movie-details-container">
          <img src={movie.imgUrl} alt={movie.title} />
          <h1>{movie.title}</h1>
          <p>Ano: {movie.year}</p>
          <h2>{movie.subTitle}</h2>
          <div className="movie-synopsis">
            <p>{movie.synopsis}</p>
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default MovieDetails;
