import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

const SearchBox = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: white
  border-radius: 5px;
  color: black;
  padding: 5px;
  border: none;
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
    cursor: pointer;
  }
`;

const Nav = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  // 검색어 변경 이벤트 핸들러
  const moveSearchPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    navigate(`/search?query=${e.target.value}`);
  };

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

      {pathname === "/" ? (
        <Login onClick={() => navigate("/login")}>Login</Login>
      ) : (
        <SearchBox
          className="nav__input"
          placeholder="검색어를 입력하세요."
          value={searchValue}
          onChange={moveSearchPage}
        />
      )}
    </NavWrapper>
  );
};

export default Nav;
