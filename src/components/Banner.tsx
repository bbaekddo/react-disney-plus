import React, { useEffect } from "react";
import axiosInstance from "../api/axios";
import movieRequests from "../api/request";
import { AxiosResponse } from "axios";
import { useState } from "react";

const Banner = () => {
  const [movie, setMovie] = useState<any>(null);

  // 상영중인 영화 정보 불러오기
  const fetchMovies = async () => {
    const getNowPlayingResponse: AxiosResponse = await axiosInstance.get(
      movieRequests.fetchNowPlaying
    );

    // 여러 영화 중 하나의 ID 추출
    const movieId: string =
      getNowPlayingResponse.data.results[
        Math.floor(Math.random() * getNowPlayingResponse.data.results.length)
      ].id;

    // 특정 영화 정보 조회
    const movideMetadata: any = await axiosInstance.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(movideMetadata.data);
  };

  // 영화 설명 단축
  const truncateDescription = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
        height: 500,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          {movie?.videos?.results[0]?.key && (
            <button className="banner__button play">Play</button>
          )}
        </div>
      </div>
      <p className="banner__description">
        {truncateDescription(movie?.overview, 100)}
      </p>
    </header>
  );
};

export default Banner;
