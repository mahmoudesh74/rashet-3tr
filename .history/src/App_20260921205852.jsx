import "./App.css";
import HomePage from "./pages/HomePage/homePag";
import NavBar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;