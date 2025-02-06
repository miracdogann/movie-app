import { useEffect, useState } from "react";

const api_key = "357c6acea3964bc6c7bb8a0523435f61";

export default function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [total_results, setTotallResults] = useState(0);

  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

  function previousPage() {
    setCurrentPage(currentPage - 1);
  }

  useEffect(
    function () {
      // console.log(query);
      const controller = new AbortController();
      const signal = controller.signal;

      async function getMovies(page) {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${page}`,
            { signal: signal }
          );
          console.log(res);

          if (!res.ok) {
            throw new Error("Bilinmeyen bir hata oluştu");
          }

          const data = await res.json();
          if (data.total_results === 0) {
            throw new Error("Aradığınız Film Bulunamadı");
          }

          setMovies(data.results);
          setTotalPage(data.total_pages);
          setTotallResults(data.total_results);
        } catch (err) {
          if (err.name === "AbortError") {
            console.log("aborted...");
          } else {
            setError(err.message);
          }
        }
        setLoading(false);
        if (query.length < 3) {
          setMovies([]);
          setError("");
        }
      }

      getMovies(currentPage);
      return () => {
        controller.abort();
      };
    },
    [query, currentPage]
  );

  return {
    movies,
    loading,
    error,
    currentPage,
    totalPage,
    total_results,
    nextPage,
    previousPage,
  };
}
