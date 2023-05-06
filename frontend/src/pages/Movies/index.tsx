import { useEffect, useState } from "react";
import { SpringPage } from "../../types/vendor/spring";
import { MovieData } from "../../types/moviedata";
import { Link } from "react-router-dom";
import { requestBackend } from "../../util/requests";
import { AxiosRequestConfig } from "axios";
import MovieCard from "../../components/MovieCard";
import { Genero } from "../../types/genero";
import Pagination from "../../components/Pagination";
import Select from "react-select";

import "./styles.css";

// Optei por deixar o componente chamar todos os filmes do backend no caso do usuário fechar a categoria escolhida, pois assim
// é possível vermos a paginação em modo funcional
// Também deixei um botão de voltar, sem a preocupação de alinhamento com o botão sair, a partir do breakpoint de 576px para 
// facilitar a análise da programação, já que após realizar uma avalição só havia a opção SAIR. O breakpoint de 576px é para
// Não quebrar o NavBar em 320px, mas este botão futuramente poderá ser configurado normalmente com o botão SAIR.


const Movies = () => {
  const [page, setPage] = useState<SpringPage<MovieData>>();
  const [categoria, setCategoria] = useState<Number[] | undefined>();
  const [categorias, setCategorias] = useState<Genero[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const options = categorias.map((categoria) => ({
    value: categoria.id,
    label: categoria.name,
  }));

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    
  };

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
        url: `/movies?page=${currentPage}&size=4&sort=id,desc&genreId=${categoria}`,
        withCredentials: true,
      };

      requestBackend(params)
        .then((response) => {
          setPage(response.data);
          console.log(response.data);
        })
        .finally(() => {});
    }
  }, [categoria, currentPage]);

  return (
    <>
      <div className="container my-4 category-container">
        <div className="row category-field-select">
          <Select
            isMulti
            classNamePrefix={"category-select"}
            options={options}
            styles={{
              multiValueRemove: (base) => ({
                ...base,
                display: "none",
              }),
              control: (base, state) => ({
                ...base,
                boxShadow: state.isFocused ? "none" : "none",
              }),
            }}
            onChange={(selectedOptions) => {
              if (selectedOptions) {
                const selectedValues = selectedOptions.map(
                  (option: any) => option.value
                );
                setCategoria(selectedValues);
              } else {
                setCategoria(undefined);
              }
            }}
          />
          
        </div>

        {categoria && (
          <div className="row">
            {page?.content.map((movies) => (
              <div className="col-sm-6 col-lg-4 col-xl-3" key={movies.id}>
                <Link to={`/movies/${movies.id}`}>
                  <MovieCard movie={movies} />
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="row">
          <Pagination
            pageCount={page?.totalPages ?? 0}
            range={3}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Movies;
