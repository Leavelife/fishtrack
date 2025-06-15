import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
    <Navbar/>
      <main className="p-0 m-0">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
