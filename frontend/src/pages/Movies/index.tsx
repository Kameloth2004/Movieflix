import { useEffect, useState } from "react";
import { SpringPage } from "../../types/vendor/spring";
import { MovieData } from "../../types/moviedata";
import { Link } from "react-router-dom";
import { requestBackend } from "../../util/requests";
import { AxiosRequestConfig } from "axios";
import MovieCard from "../../components/MovieCard";
import { Genero } from "../../types/genero";
import "./styles.css";
import Pagination from "../../components/Pagination";

const Movies = () => {
  const [page, setPage] = useState<SpringPage<MovieData>>();
  const [categoria, setCategoria] = useState<Number | undefined>();
  const [categorias, setCategorias] = useState<Genero[]>([]);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: "/genres",
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => {
        setCategorias(response.data);
      })
      .finally(() => {});
  }, []);

  useEffect(() => {
    if (categoria !== undefined) {
      const params: AxiosRequestConfig = {
        method: "GET",
        url: `/movies?page=0&size=4&sort=id,desc&genreId=${categoria}`,
        withCredentials: true,
      };

      requestBackend(params)
        .then((response) => {
          setPage(response.data);
        })
        .finally(() => {});
    }
  }, [categoria]);

  return (
    <>
      <div>
        <div className="movie-card">
          <select
            id="categorias"
            name="categorias"
            onChange={(evento) => setCategoria(Number(evento.target.value))}
          >
            <option></option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.name}
              </option>
            ))}
          </select>
        </div>

        {categoria && (
          <div className="card-bottom-container">
            {page?.content.map((movies) => (
              <div className="row" key={movies.id}>
                <Link to={`/movies/${movies.id}`}>
                  <MovieCard movie={movies} />
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="row">
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Movies;
