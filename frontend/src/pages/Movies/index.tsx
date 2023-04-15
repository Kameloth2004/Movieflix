import { useEffect, useState } from "react";
import { SpringPage } from "../../types/vendor/spring";
import { MovieData } from "../../types/moviedata";
import { Link } from "react-router-dom";
import { requestBackend } from "../../util/requests";
import { AxiosRequestConfig } from "axios";
import MovieCatalog from "../../components/moviecatalog";



const Movies = () => {
  
  const [page, setPage] = useState<SpringPage<MovieData>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies?page=0&size=2',
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
          <h1>Tela listagem de filmes</h1>
        </div>
        <div className="card-bottom-container" >
          {page?.content.map((movies) => (
           <div className="row" key={movies.id}>
            <Link to={`/movies/${movies.id}`}>
            <MovieCatalog movies={movies} />
              </Link>
              </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Movies;
