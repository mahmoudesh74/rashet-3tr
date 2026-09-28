import "./App.css";
import HomePage from "./pages/HomePage/homePag";
import NavBar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import GroupPage from "./pages/GroupPage/GroupPage"

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/GroupPage" element={<GroupPage />} />
        

      </Routes>

      <Footer />
    </>
  );
}

export default App;