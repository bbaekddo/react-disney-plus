import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../api/axios";
import "./SearchPage.css";
import useDebounce from "../../hooks/useDebounce";

// SearchPage 컴포넌트
const SearchPage = () => {
  const [searchMovies, setSearchMovies] = useState<any>([]);
  const navigate = useNavigate();

  // 검색어를 가져오기 위한 커스텀 훅
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const searchParam: string = useQuery().get("query") || "";
  const debouncedSearchParam: string = useDebounce(searchParam, 500);

  // 검색한 영화 조회
  const fetchSearchMovie = useCallback(async (searchMovie: string) => {
    try {
      const response = await instance.get(
        `search/multi?include_adult=false&query=${searchMovie}`
      );

      // 영화 정보 저장
      setSearchMovies(response.data.results);
    } catch (err: any) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (debouncedSearchParam) {
      fetchSearchMovie(debouncedSearchParam);
    }
  }, [debouncedSearchParam, fetchSearchMovie]);

  // 검색 결과가 있는 경우
  if (searchMovies?.length) {
    return (
      <section className="search-container">
        {searchMovies.map((movie: any) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;

            return (
              <div className="movie" key={movie.id}>
                <button
                  type="button"
                  onClick={() => navigate(`/${movie.id}`)}
                  className="movie__column-poster"
                  aria-label={`${movie.title} 영화 상세 페이지로 이동`}
                >
                  <img
                    src={movieImageUrl}
                    alt={movie.title}
                    className="movie__poster"
                  />
                </button>
              </div>
            );
          }
        })}
      </section>
    );
  }

  // 검색 결과가 없는 경우
  return (
    <section className="no-results">
      <div className="no-results__text">
        <p>
          찾고자 하는 검색어 "{debouncedSearchParam}"에 대한 결과가 없습니다.
        </p>
      </div>
    </section>
  );
};

export default SearchPage;
