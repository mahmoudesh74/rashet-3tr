import "./App.css";
import HomePage from "./pages/HomePage/homePag";
import NavBar from "./components/NavBar/Navbar"
import Footer from "./components/Footer/Footer"
function App() {
  return (
    <>
    <NavBar />

     <Routes>
      <Route path="/" element={<HomePage/>
} />
     <Routes/>

<Footer />

</>
    
  );
}

export default App;
