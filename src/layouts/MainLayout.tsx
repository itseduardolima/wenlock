import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/main.scss";

const MainLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-area">
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;