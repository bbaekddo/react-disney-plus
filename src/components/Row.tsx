import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal";

const Row = ({
  title,
  id,
  fetchUrl,
}: {
  title: string;
  id: string;
  fetchUrl: string;
}) => {
  // 영화 정보
  const [movies, setMovies] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState<any>({});

  // 영화 정보 가져오기
  const fetchMovies = useCallback(async () => {
    try {
      const response = await axiosInstance.get(fetchUrl);
      setMovies(response.data.results);

      return response;
    } catch (error) {
      console.error(error);
    }
  }, [fetchUrl]);

  // 영화 클릭 이벤트
  const handleClick = async (movie: any) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  // fetchMovies() 실행
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span className="arrow">{"<"}</span>
        </div>
        <div id={id} className="row__posters">
          {movies.map((movie: any) => (
            <button
              key={movie.id}
              type="button"
              className="row__poster"
              onClick={() => handleClick(movie)}
              aria-label={`영화 ${movie.title} 선택`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </button>
          ))}
        </div>
        <div className="slider__arrow-right">
          <span className="arrow">{">"}</span>
        </div>
      </div>

      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </div>
  );
};

export default Row;
