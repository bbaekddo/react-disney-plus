import "./App.css";
import MainPage from "./pages/MainPage";
import { Routes, Route, Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import LoginPage from "./pages/LoginPage";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";

/**
 * 기본 레이아웃
 */
const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

/**
 * 라우팅
 */
const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
