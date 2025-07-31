import React, { JSX } from "react";
import "./App.css";
import Nav from "./components/Nav";
import styled from "styled-components";
import Banner from "./components/Banner";
import Category from "./components/Category";
import Row from "./components/Row";
import requests from "./api/request";

/**
 * 메인 컨테이너 스타일 컴포넌트
 * 배경 이미지와 레이아웃을 설정합니다.
 */
const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

/**
 * 메인 애플리케이션 컴포넌트
 * Disney Plus 앱의 홈페이지를 렌더링합니다.
 * @returns {JSX.Element} 애플리케이션 JSX 엘리먼트
 */
const App = (): JSX.Element => {
  return (
    <Container>
      <Nav />
      <Banner />
      <Category />
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
    </Container>
  );
};

export default App;
