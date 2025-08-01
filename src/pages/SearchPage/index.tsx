import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../../api/axios";

// styled components
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
  }
`;

const SearchBox = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rbga(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
`;

// SearchPage 컴포넌트 (구현 예정)
const SearchPage = () => {
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [searchMovies, setSearchMovies] = useState<any>([]);
  const navigate = useNavigate();

  // 검색어 변경 이벤트 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    navigate(`/search?query=${e.target.value}`);
  };

  // 검색어를 가져오기 위한 커스텀 훅
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const searchParam: string | null = useQuery().get("query");

  // 검색한 영화 조회
  const fetchSearchMovie = async (searchMovie: string) => {
    try {
      const response = await instance.get(
        `search/multi?include_adult=false&query=${searchMovie}`
      );

      // 영화 정보 저장
      setSearchMovies(response.data.results);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (searchParam) {
      fetchSearchMovie(searchParam);
    }
  }, [searchParam]);

  return (
    <div>
      {pathname === "/" ? (
        <Login>Login</Login>
      ) : (
        <SearchBox
          value={searchValue}
          onChange={handleChange}
          className="nav__input"
          type="text"
          placeholder="검색"
        />
      )}
    </div>
  );
};

export default SearchPage;
