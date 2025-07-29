import React, { useCallback, useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import "./Row.css";

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
            <img
              key={movie.id}
              className="row__poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              //   onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span className="arrow">{">"}</span>
        </div>
      </div>
    </div>
  );
};

export default Row;
