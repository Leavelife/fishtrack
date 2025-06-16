import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
    <Navbar/>
      <main className="p-0 m-0">
        <Outlet />
      </main>
    </>
  );
};

export default App;
