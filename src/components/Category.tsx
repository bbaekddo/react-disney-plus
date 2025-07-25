import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 30px;
  padding: 30px 0px 26px;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(5, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
              rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  border: 3px solid rgba(249, 249, 249, 0.1);
  transition: all 250ms cubic-bezier(0.25, 0.45, 0.25, 1);

  img {
    inset: 0px;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out: 0s;
    width: 100%;
    z-index: 1;
  }

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    opacity: 0;
    z-index: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
                
  }
`;

const Category = () => {
  return (
    <Container>
      <Wrap>
        <img src="/images/viewrs-disney.png" alt="Disney" />
        <video autoPlay muted loop>
          <source src="/videos/disney.mp4" type="video/mp4" />
        </video>
      </Wrap>
    </Container>
  );
};

export default Category;
