import { useState } from "react";
import Loading from "../Loading";
import StarRating from "../../StarRating";
import useMovieDetalis from "../../hooks/useMovieDetalis";

export default function MovieDetails({
  selectedMovie,
  unSelectMovie,
  onAddTolist,
  selectedMovies,
}) {
  const [userRating, SetUserRating] = useState("");

  const { movie, loading } = useMovieDetalis(selectedMovie);

  const İsAddedToList = selectedMovies.map((m) => m.id).includes(selectedMovie);
  // console.log(addedToList);

  const selectedMovieUserRating = selectedMovies.find(
    (m) => m.id === selectedMovie
  )?.userRating;
  function handleAddToList() {
    const newMovie = {
      ...movie,
      userRating,
    };
    onAddTolist(newMovie);
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="border p-2 mb-3">
          <div className="row">
            <div className="col-4">
              <img
                src={
                  movie.poster_path
                    ? `https://media.themoviedb.org/t/p/w440_and_h660_face` +
                      movie.poster_path
                    : "/img/no-image.jpg"
                }
                alt={movie.title}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-8">
              <h6>{movie.title}</h6>
              <p>
                <i className="bi bi-calendar2-date me-1">
                  <span className="m-2">{movie.release_date}</span>
                </i>
              </p>
              <p>
                <i className="bi bi-star-fill text-warning me-1"></i>
                <span>{movie.vote_average}</span>
              </p>
            </div>
            <div className="col-12 border-top p-3 mt-3">
              <p>{movie.overview}</p>
              <p>
                {movie.genres?.map((genre) => (
                  <span key={genre.id} className="badge text-bg-primary me-1">
                    {genre.name}
                  </span>
                ))}
              </p>
              {!İsAddedToList ? (
                <>
                  <div className="my-4">
                    <StarRating
                      maxRating={10}
                      size={20}
                      onRating={SetUserRating}
                    />
                  </div>

                  <button
                    className="btn btn-primary me-1"
                    onClick={() => handleAddToList(movie)}
                  >
                    Listeye Ekle
                  </button>
                </>
              ) : (
                <p>
                  Film Listenizde. Değerlendirme :{" "}
                  <i className="bi bi-stars text-warning me-1"></i>
                  {selectedMovieUserRating}
                </p>
              )}

              <button className="btn btn-danger" onClick={unSelectMovie}>
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
