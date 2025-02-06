import { useEffect, useState } from "react";
const api_key = "357c6acea3964bc6c7bb8a0523435f61";

export default function useMovieDetalis(id) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(
    function () {
      async function getMovieDetails() {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`
        );
        const data = await res.json();
        // console.log(data);
        setMovie(data);
        setLoading(false);
      }
      getMovieDetails();
    },
    [id]
  );
  return { movie, loading };
}
