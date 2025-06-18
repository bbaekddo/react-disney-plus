import React, { useEffect } from "react";
import axiosInstance from "../api/axios";
import movieRequests from "../api/request";
import { AxiosResponse } from "axios";
import { useState } from "react";

const Banner = () => {
  const [movie, setMovie] = useState<any>(null);

  const fetchMovies = async () => {
    // 상영중인 영화 정보 불러오기
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
    setMovie(movideMetadata);
    console.log(movideMetadata);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return <div>Banner</div>;
};

export default Banner;
