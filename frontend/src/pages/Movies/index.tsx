import { useEffect, useState } from "react";
import { SpringPage } from "../../types/vendor/spring";
import { MovieData } from "../../types/moviedata";
import { Link } from "react-router-dom";
import { requestBackend } from "../../util/requests";
import { AxiosRequestConfig } from "axios";

import "./styles.css";
import MovieCard from "../../components/MovieCard";

const Movies = () => {
  const [page, setPage] = useState<SpringPage<MovieData>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: "/movies?page=0&size=4&sort=id,desc",
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      })
      .finally(() => {});
  }, []);

  return (
    <>
      <div>
        <div className="movie-card">
          <label htmlFor="categorias">Escolha uma categoria:</label>
          <select id="categorias" name="categorias">
            <option value="categoria1">Categoria 1</option>
            <option value="categoria2">Categoria 2</option>
            <option value="categoria3">Categoria 3</option>
          </select>
        </div>
        <div className="card-bottom-container">
          {page?.content.map((movies) => (
            <div className="row" key={movies.id}>
              <Link to={`/movies/${movies.id}`}>
                <MovieCard movie={movies} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Movies;