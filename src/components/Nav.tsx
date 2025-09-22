import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import firebaseServices from "../firebase";

// NavWrapper props 타입 정의
interface NavWrapperProps {
  $show: boolean;
}

const NavWrapper = styled.nav<NavWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) => (props.$show ? "#090b13" : "transparent")};
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
  background-color: white;
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

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0 0 18px 0;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100%;
  opacity: 0;
`;

const Logout = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const Nav = () => {
  // 상태 관리
  const initialUserData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") || "")
    : {};
  const { pathname } = useLocation();
  const [show, setShow] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  const [userData, setUserData] = useState<any>(initialUserData);
  const navigate = useNavigate();
  const { auth, provider } = firebaseServices;

  // 검색어 변경 이벤트 핸들러
  const moveSearchPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    navigate(`/search?query=${e.target.value}`);
  };

  // 인증 처리
  const handleAuth = (): void => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user);
        localStorage.setItem("userData", JSON.stringify(result.user));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 로그아웃
  const handleLogout = (): void => {
    auth
      .signOut()
      .then(() => {
        setUserData({});
        localStorage.removeItem("userData");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // 인증 상태 변경 시 처리
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 루트 페이지에 있으면 메인으로 이동
        if (pathname === "/") {
          navigate("/main");
        }
        // 다른 페이지에 있으면 그대로 유지
      } else {
        // 루트 페이지가 아닌 경우만 리다이렉션
        if (pathname !== "/") {
          navigate("/");
        }
      }
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, [auth, navigate, pathname]);

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
    <NavWrapper $show={show}>
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
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <SearchBox
            value={searchValue}
            onChange={moveSearchPage}
            className="nav__input"
            type="text"
            placeholder="검색어를 입력하세요."
          />

          <Logout onClick={handleLogout}>
            <UserImg src={userData?.photoURL} alt="UserPhoto" />
            <DropDown>
              <span>Sign Out</span>
            </DropDown>
          </Logout>
        </>
      )}
    </NavWrapper>
  );
};

export default Nav;
