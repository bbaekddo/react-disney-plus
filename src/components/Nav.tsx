import { useEffect, useState } from "react";
import styled from "styled-components";

// NavWrapper props 타입 정의
interface NavWrapperProps {
  show: boolean;
}

const NavWrapper = styled.nav<NavWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) => (props.show ? "#090b13" : "transparent")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

const Nav = () => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const handle_scroll = (): void => {
      window.scrollY > 50 ? setShow(true) : setShow(false);
    };

    window.addEventListener("scroll", handle_scroll);

    return () => {
      window.removeEventListener("scroll", handle_scroll);
    };
  }, []);

  return (
    <NavWrapper show={show}>
      <Logo>
        <button
          type="button"
          onClick={(event: React.MouseEvent<HTMLButtonElement>): void => {
            event.preventDefault();
            window.location.assign("/");
          }}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <img alt="Disney Plus Logo" src="/images/logo.svg" />
        </button>
      </Logo>
    </NavWrapper>
  );
};

export default Nav;
