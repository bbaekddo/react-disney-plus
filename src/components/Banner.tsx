import React, { useEffect } from "react";
import axiosInstance from "../api/axios";
import movieRequests from "../api/request";
import { AxiosResponse } from "axios";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const IframeContainer = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Banner = () => {
  const [movie, setMovie] = useState<any>(null);
  const [isClicked, setIsClicked] = useState(false);

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

  // 영화 정보 1번만 불러오기
  useEffect(() => {
    fetchMovies();
  }, []);

  if (isClicked) {
    return (
      <>
        <Container>
          <HomeContainer>
            <IframeContainer
              src={`https://www.youtube.com/embed/${movie?.videos?.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie?.videos?.results[0]?.key}`}
              width="640"
              height="360"
              frameBorder="0"
              allow="autoplay"
              allowFullScreen
            />
          </HomeContainer>
        </Container>
        <button onClick={() => setIsClicked(false)}>Close</button>
      </>
    );
  }

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
            <button
              className="banner__button play"
              onClick={() => setIsClicked(true)}
            >
              Play
            </button>
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
