import StarRating from "./StarRating";
import { useEffect, useState } from "react";
import useMovies from "./hooks/useMovies";
import useMovieDetalis from "./hooks/useMovieDetalis";
import useLocalStorage from "./hooks/useLocalStorage";
import Pagination from "./components/Pagination";
import ErrorMessage from "./components/ErrorMessage";
import Loading from "./components/Loading";
import Nav from "./components/Navbar/Nav";
import Search from "./components/Navbar/Search";
import NavSearchResults from "./components/Navbar/NavSearchResults";
import Main from "./components/Main";
import ListContainer from "./components/ListContainer";
import Logo from "./components/Navbar/Logo";
import MovieList from "./components/Movies/MovieList";
import MyMovieList from "./components/SelectedMovies/MyMovieList";
import MyListSummary from "./components/SelectedMovies/MyListSummary";
import MovieDetails from "./components/Movies/MovieDetails";
const api_key = "357c6acea3964bc6c7bb8a0523435f61";
// const query = "grand";

export default function App() {
  const [query, setQuery] = useState("money");
  const [selectedMovies, setSelectedMovies] = useLocalStorage(
    [],
    "selectedMovies"
  );
  const [selectedMovie, setSelectedMovie] = useState(null);

  console.log(selectedMovie);

  const {
    movies,
    loading,
    error,
    currentPage,
    totalPage,
    total_results,
    nextPage,
    previousPage,
  } = useMovies(query);
  function handleSelectedMovie(id) {
    setSelectedMovie((selectedMovie) => (id === selectedMovie ? null : id));
  }

  function handleUnSelectedMovied() {
    setSelectedMovie(null);
  }
  function handleAddToAdd(movie) {
    setSelectedMovies((selectedMovies) => [...selectedMovies, movie]);
    handleUnSelectedMovied();
  }
  function handleDeleteFromList(id) {
    setSelectedMovies((selectedMovies) =>
      selectedMovies.filter((m) => m.id !== id)
    );
  }

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NavSearchResults total_results={total_results} />
      </Nav>
      <Main>
        <div className="row mt-2">
          <div className="col-md-9">
            <ListContainer>
              {/* {loading ? <Loading /> : <MovieList movies={movies} />} */}

              {loading && <Loading />}
              {!loading && !error && (
                <>
                  {movies.length > 0 && (
                    <>
                      <MovieList
                        movies={movies}
                        onSelectMovie={handleSelectedMovie}
                        selectedMovie={selectedMovie}
                      />
                      <Pagination
                        nextPage={nextPage}
                        previousPage={previousPage}
                        currentPage={currentPage}
                        totalPage={totalPage}
                      />
                    </>
                  )}
                </>
              )}
              {error && <ErrorMessage message={error} />}
            </ListContainer>
          </div>
          <div className="col-md-3">
            <ListContainer>
              {selectedMovie ? (
                <MovieDetails
                  selectedMovie={selectedMovie}
                  unSelectMovie={handleUnSelectedMovied}
                  onAddTolist={handleAddToAdd}
                  selectedMovies={selectedMovies}
                />
              ) : (
                <>
                  <MyListSummary selectedMovies={selectedMovies} />
                  <MyMovieList
                    selectedMovies={selectedMovies}
                    onDeleteFromList={handleDeleteFromList}
                  />
                </>
              )}
            </ListContainer>
          </div>
        </div>
      </Main>
    </>
  );
}
